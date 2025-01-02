from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from app.services import vision_service, openai_service  # 必要に応じて修正
from app.models.clothes import Clothes  # 必要に応じて修正
from app.utils.db import db  # 必要に応じて修正
from app.routes.items import items_bp # items.py があるモジュールパスを指定
from config.config import Config
import os
from urllib.parse import unquote

import firebase_admin
from firebase_admin import credentials

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
CORS(app)  # すべてのオリジンからのリクエストを許可

# サービスアカウントの秘密鍵のパスを指定
cred = credentials.Certificate('finalproject-dayzy-firebase-adminsdk-cgsd0-41718e8590.json')
firebase_admin.initialize_app(cred)

# プロジェクトルートの画像フォルダパス
IMAGE_FOLDER = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../photo'))
print(f"Image folder path: {IMAGE_FOLDER}")  # パスをログ出力して確認

# ローカル実装用
@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file'}), 400
    
    image = request.files['image']
    if image.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    # ローカルのphotoフォルダに画像を保存
    image_path = os.path.join(IMAGE_FOLDER, image.filename)
    image.save(image_path)
    
    # 画像のパスを使用
    image_url = f'/images/{image.filename}'
    
    tags = vision_service.analyze_image(image)
    
    clothes = Clothes(type=tags['type'], color=tags['color'], image_url=image_url)
    db.session.add(clothes)
    db.session.commit()
    
    return jsonify({'message': 'Image uploaded successfully', 'image_url': image_url}), 200

@app.route('/images/<path:filename>', methods=['GET'])
def serve_image(filename):
    try:
        decoded_filename = unquote(filename)
        file_path = os.path.join(IMAGE_FOLDER, decoded_filename)
        print(f"Serving file from: {file_path}")  # 追加ログ
        if os.path.exists(file_path):
            return send_from_directory(IMAGE_FOLDER, decoded_filename)
        else:
            print(f"File not found: {file_path}")
            return "File not found", 404
    except Exception as e:
        print(f"Error serving image: {e}")
        return "Internal server error", 500

@app.route('/suggest', methods=['GET'])
def suggest_outfit():
    # ローカルphotoフォルダから画像を取得
    images = [f'/images/{file}' for file in os.listdir(IMAGE_FOLDER) if os.path.isfile(os.path.join(IMAGE_FOLDER, file))]
    suggestion = openai_service.generate_suggestion(images)
    
    # ダミーデータを使用
    outfit = {
        'top': {'color': 'Green', 'image': '015GreenCoart.png'},
        'bottom': {'color': 'Black', 'image': '014BlackSkirt.png'},
        'recommendation': suggestion
    }
    
    return jsonify(outfit), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)