#**************************************************************************
# registration/page.tsxでリクエストされたコードをうけて、
# S3に画像をアップロードし、データベースにデータを保存する

from flask import Blueprint, request, jsonify
import boto3
from botocore.exceptions import NoCredentialsError
import os
import uuid
import json
from dotenv import load_dotenv
from sqlalchemy import create_engine, Column, String, Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

load_dotenv()  # .envファイルから環境変数を読み込む

registration_bp = Blueprint('registration_bp', __name__)

s3 = boto3.client('s3',
                  aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
                  aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
                  region_name=os.getenv('AWS_REGION'))

BUCKET_NAME = os.getenv('S3_BUCKET_NAME')

# SQLAlchemy設定
DATABASE_URL = os.getenv('DATABASE_URL')
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
Base = declarative_base()

# データベースモデル
class Item(Base):
    __tablename__ = 'items'
    id = Column(Integer, primary_key=True, autoincrement=True)
    category = Column(String(255), nullable=False)
    color = Column(String(255), nullable=False)
    url = Column(String(255), nullable=False)

Base.metadata.create_all(engine)

@registration_bp.route('/upload', methods=['POST'])
def upload_to_s3():
    session = Session()
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
        
        # デバッグ用のログ
        print(f"File: {file}")
        print(f"Category: {category}")
        print(f"Color: {color}")
              

        # ファイルをS3にアップロード
        image_name = str(uuid.uuid4()) + os.path.splitext(file.filename)[1]  # ユニークな名前を生成
        s3.upload_fileobj(file, BUCKET_NAME, image_name)

        # アップロードされた画像のURLを生成
        item_image_url = f'https://{BUCKET_NAME}.s3.amazonaws.com/{image_name}'

        # データベースに情報を保存
        try:
            new_item = Item(category=category, color=color, url=item_image_url)
            session.add(new_item)
            session.commit()
            print("Data saved to database successfully")
        except Exception as db_error:
            session.rollback()
            print(f"Error saving to database: {db_error}")
            return jsonify({'error': 'Failed to save data to database'}), 500
            
        return jsonify({'message': 'File uploaded successfully', 'filename': item_image_url}), 200

    except NoCredentialsError:
        return jsonify({'error': 'Credentials not available'}), 403
    except Exception as e:
        session.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        session.close()

# ********************************************************


