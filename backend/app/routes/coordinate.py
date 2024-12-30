# コーデ提案画面とコーデ決定ボタン

# from flask import Blueprint

# coordinate_bp = Blueprint("coordinate_bp", __name__)
# @coordinate_bp.route('/')
# def index():
#  return "Hello,coordinate" 

# @coordinate_bp.route('/recommend')
# def recommend_index():
#  return "Hello, coordinate recommend" 

from flask import Blueprint, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_mysqldb import MySQL
from app.services.ai_recommender import generate_outfit, parse_outfit_response

coordinate_bp = Blueprint("coordinate_bp", __name__)

# mysql = MySQL()
db = SQLAlchemy()

class Coordinate(db.Model):
    __tablename__ = 'coordinates'
    id = db.Column(db.Integer, primary_key=True)
    tops_image = db.Column(db.String(255), nullable=False)
    bottoms_image = db.Column(db.String(255), nullable=False)
    date = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return f'<Coordinate {self.id}>'

# コーデボタンクリックすると　上下画像が出てきてコーデ提案をする
@coordinate_bp.route('/recommend', methods=['POST'])
def recommend_coordinate():
    data = request.get_json()
    
# コーディネート提案のロジックを実装
    generated_outfit = generate_outfit(tops, bottoms)
    tops_color, bottoms_color = parse_outfit_response(generated_outfit)
#色に基づいて画像を選択するロジックを実装
    tops_image = f"https://myclosetphoto.s3.ap-northeast-3.amazonaws.com/{tops_color}_top_image.png" # 例: tops_color に基づいて画像URLを取得 
    bottoms_image = f"https://myclosetphoto.s3.ap-northeast-3.amazonaws.com/{bottoms_color}_bottom_image.png" # 例: bottoms_color に基づいて画像URLを取得 

    # tops_image = "https://myclosetphoto.s3.ap-northeast-3.amazonaws.com/001%E8%8A%B1%E6%9F%84%E3%83%AF%E3%83%B3%E3%83%94.png"
    # bottoms_image = "https://myclosetphoto.s3.ap-northeast-3.amazonaws.com/010%E7%99%BD%E3%83%91%E3%83%B3%E3%83%84.png"
    
    response = {
        "tops-image": tops_image,
        "bottoms-image": bottoms_image,
        }

    return jsonify(response), 200

# コーデ決定ボタン（YES)を押すと　コーデセットが決定する
@coordinate_bp.route('/', methods=['POST'])
def coordinate():
    data = request.get_json()
    tops_image = data.get('tops-image')
    bottoms_image = data.get('bottoms-image')
    date = data.get('date')

    # SQL Alchemyにデータを挿入する
    new_coordinate = Coordinate(tops_image=tops_image, bottoms_image=bottoms_image, date=date)
    db.session.add(new_coordinate)
    db.session.commit()
 
    response = {
        "tops-image": tops_image,
        "bottoms-image": bottoms_image,
    }

    return jsonify(response), 200

