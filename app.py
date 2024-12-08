from flask import Flask, request, jsonify
from flask_cors import CORS
from backend.app.services import image_service, vision_service, ai_recommender
from backend.models.clothes import Clothes
from backend.utils.db import db
from backend.app.config import Config

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)
db.init_app(app)

# コンフィグの設定（ここにAWSとRDSの認証情報を設定）必要に応じて入力
app.config['AWS_ACCESS_KEY_ID'] = 'YOUR_AWS_ACCESS_KEY_ID'
app.config['AWS_SECRET_ACCESS_KEY'] = 'YOUR_AWS_SECRET_ACCESS_KEY'
app.config['S3_BUCKET'] = 'myclosetphoto'
app.config['RDS_HOST'] = 'YOUR_RDS_HOST'
app.config['RDS_USER'] = 'YOUR_RDS_USER'
app.config['RDS_PASSWORD'] = 'YOUR_RDS_PASSWORD'
app.config['RDS_DB_NAME'] = 'YOUR_RDS_DB_NAME'
app.config['RDS_PORT'] = 3306 # 通常は3306

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file'}), 400
    
    image = request.files['image']
    if image.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    image_url = image_service.upload_to_s3(image)
    if not image_url:
        return jsonify({'error': 'Failed to upload image'}), 500
    
    tags = vision_service.analyze_image(image)
    
    clothes = Clothes(type=tags['type'], color=tags['color'], image_url=image_url)
    db.session.add(clothes)
    db.session.commit()
    
    return jsonify({'message': 'Image uploaded successfully', 'image_url': image_url}), 200

@app.route('/suggest', methods=['GET'])
def suggest_outfit():
    images = image_service.get_images_from_s3()
    suggestion = openai_service.generate_suggestion(images)
    return jsonify({'suggestion': suggestion}), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)