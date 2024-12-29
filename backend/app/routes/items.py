# from flask import Blueprint

# items_bp = Blueprint("items_bp", __name__)
# @items_bp.route('/')
# def index():
#  return "Hello,items" 

# @items_bp.route('/analyze')
# def index():
#     return "Hello, items analyze"



from flask import Blueprint, request, jsonify
from app.utils.db import db
from app.models.items import Item
from datetime import datetime
import boto3
import uuid
import os

from dotenv import load_dotenv
load_dotenv()  # .env ファイルから環境変数を読み込む

items_bp = Blueprint("items_bp", __name__)

s3 = boto3.client('s3',
                  aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
                  aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
                  region_name=os.getenv('AWS_REGION'))

# クローゼットのアイテムを編集
# GET エンドポイント
@items_bp.route('/api/items/<int:id>', methods=['GET'])
def get_item(id):
    item = Item.query.get(id)
    if item:
        response = {
            "itemId": item.id,
            "itemImageURL": item.url,
            "categoryTag": item.category,
            "colorTag": item.color
        }
        return jsonify(response), 200
    else:
        return jsonify({"error": "Item not found"}), 404

# PUT エンドポイント
@items_bp.route('/api/items/<int:id>', methods=['PUT'])
def update_item(id):
    data = request.get_json()
    item = Item.query.get(id)
    if not item:
        return jsonify({"error": "Item not found"}), 404
    
    item_image_url = data.get('itemImageURL')
    category_tag = data.get('categoryTag')
    color_tag = data.get('colorTag')

    if item_image_url:
        item.url = item_image_url
    if category_tag:
        item.category = category_tag
    if color_tag:
        item.color = color_tag

    db.session.commit()
    
    return '', 204

# DELETE エンドポイント
@items_bp.route('/api/items/<int:id>', methods=['DELETE'])
def delete_item(id):
    item = Item.query.get(id)
    if not item:
        return jsonify({"error": "Item not found"}), 404
    
    db.session.delete(item)
    db.session.commit()
    
    return '', 204

# POST エンドポイント (Analyze)撮影した写真をPOST
@items_bp.route('/api/items/analyze', methods=['POST'])
def analyze_item():
    data = request.get_json()
    item_image = data.get('itemImage')

    # 画像をS3にアップロード
    image_name = str(uuid.uuid4()) + '.png'
    s3_bucket = os.getenv('S3_BUCKET_NAME')
    s3.upload_fileobj(item_image, s3_bucket, image_name)
    item_image_url = f'https://{s3_bucket}.s3.amazonaws.com/{image_name}'

    # 仮のカテゴリとカラータグを生成
    category_tag = "tops"  # ここに実際の画像分析ロジックを追加
    color_tag = "brown"  # ここに実際の画像分析ロジックを追加

    # レスポンスを作成
    response = {
        "itemImageURL": item_image_url,
        "categoryTag": category_tag,
        "colorTag": color_tag
    }

    return jsonify(response), 200

# 新しい POST エンドポイント(create)
@items_bp.route('/api/items', methods=['POST'])
def create_item():
    data = request.get_json()
    item_image_url = data.get('itemImageURL')
    category_tag = data.get('categoryTag')
    color_tag = data.get('colorTag')

    # 新しいアイテムを作成してデータベースに保存
    new_item = Item(url=item_image_url, category=category_tag, color=color_tag)
    db.session.add(new_item)
    db.session.commit()

    return '', 201


