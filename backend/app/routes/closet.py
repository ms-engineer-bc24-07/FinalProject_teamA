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

closet_bp = Blueprint('closet_bp', __name__)

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

@closet_bp.route('/items', methods=['GET'])
def get_items():
    session = Session()
    try:
        items = session.query(Item).all()
        items_list = [{'categoryTag': item.category, 'imageUrl': item.url} for item in items]
        return jsonify(items_list), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        session.close()
