# from flask import Blueprint, request, jsonify
# import boto3
# from botocore.exceptions import NoCredentialsError
# import os
# import uuid

# from dotenv import load_dotenv
# load_dotenv()  # .envファイルから環境変数を読み込む

# registration_bp = Blueprint('registration_bp', __name__)

# s3 = boto3.client('s3',
#                   aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
#                   aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
#                   region_name=os.getenv('AWS_REGION'))

# BUCKET_NAME = os.getenv('S3_BUCKET_NAME')

# @registration_bp.route('/api/registration/upload', methods=['POST'])
# def upload_to_s3():
#     try:
#         if 'file' not in request.files:
#             return jsonify({'error': 'No file part'}), 400
#         file = request.files['file']
#         if file.filename == '':
#             return jsonify({'error': 'No selected file'}), 400

#         category = request.form.get('category')
#         color = request.form.get('color')

#         if not category or not color:
#             return jsonify({'error': 'Category and color are required'}), 400

#         # ファイルをS3にアップロード
#         image_name = str(uuid.uuid4()) + os.path.splitext(file.filename)[1]  # ユニークな名前を生成
#         s3.upload_fileobj(file, BUCKET_NAME, image_name)

#         # メタデータを保存
#         metadata = {'category': category, 'color': color}
#         metadata_key = f'{image_name}.json'
#         s3.put_object(Bucket=BUCKET_NAME, Key=metadata_key, Body=json.dumps(metadata), ContentType='application/json')

#         # アップロードされた画像のURLを生成
#         item_image_url = f'https://{BUCKET_NAME}.s3.amazonaws.com/{image_name}'

#         return jsonify({'message': 'File uploaded successfully', 'filename': item_image_url}), 200

#     except NoCredentialsError:
#         return jsonify({'error': 'Credentials not available'}), 403
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# def create_app():
#     app = Flask(__name__)
#     app.register_blueprint(registration_bp)
#     return app


from flask import Blueprint, request, jsonify
import boto3
from botocore.exceptions import NoCredentialsError
import os
import uuid
import json

from dotenv import load_dotenv
load_dotenv()  # .envファイルから環境変数を読み込む

registration_bp = Blueprint('registration_bp', __name__)

s3 = boto3.client('s3',
                  aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
                  aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
                  region_name=os.getenv('AWS_REGION'))

BUCKET_NAME = os.getenv('S3_BUCKET_NAME')

@registration_bp.route('/api/registration/upload', methods=['POST'])
def upload_to_s3():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        category = request.form.get('category')
        color = request.form.get('color')

        if not category or not color:
            return jsonify({'error': 'Category and color are required'}), 400

        # ファイルをS3にアップロード
        image_name = str(uuid.uuid4()) + os.path.splitext(file.filename)[1]  # ユニークな名前を生成
        s3.upload_fileobj(file, BUCKET_NAME, image_name)

        # メタデータを保存
        metadata = {'category': category, 'color': color}
        metadata_key = f'{image_name}.json'
        s3.put_object(Bucket=BUCKET_NAME, Key=metadata_key, Body=json.dumps(metadata), ContentType='application/json')

        # アップロードされた画像のURLを生成
        item_image_url = f'https://{BUCKET_NAME}.s3.amazonaws.com/{image_name}'

        return jsonify({'message': 'File uploaded successfully', 'filename': item_image_url}), 200

    except NoCredentialsError:
        return jsonify({'error': 'Credentials not available'}), 403
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def create_app():
    app = Flask(__name__)
    app.register_blueprint(registration_bp)
    return app
