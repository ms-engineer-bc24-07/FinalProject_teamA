# AIが他の色を持ってこれるように再構築したコード（最新版）
from flask import Blueprint, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from app.services.ai_recommender import generate_outfit, parse_outfit_response

coordinate_bp = Blueprint("coordinate_bp", __name__)

db = SQLAlchemy()

class Item(db.Model):
    __tablename__ = 'items'
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(50), nullable=False)  # 'tops' または 'bottoms'
    color = db.Column(db.String(50), nullable=False)
    url = db.Column(db.String(255), nullable=False)

class Coordinate(db.Model):
    __tablename__ = 'coordinates'
    id = db.Column(db.Integer, primary_key=True)
    tops_image = db.Column(db.String(255), nullable=False)
    bottoms_image = db.Column(db.String(255), nullable=False)
    date = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return f'<Coordinate {self.id}>'

@coordinate_bp.route('/recommend', methods=['POST'])
def recommend_coordinate():
    data = request.get_json()
    print("Received Data:", data)  # デバッグ用のログ

    tops = data.get('tops', None)
    bottoms = data.get('bottoms', None)

    if not tops or not bottoms:
        return jsonify({'error': 'Tops and bottoms data are required'}), 400

    try:
        response = generate_outfit(tops, bottoms)
        print("AI Response:", response)  # デバッグ用のログ

        tops_color, bottoms_color = parse_outfit_response(response)
        print("Parsed Colors - Tops:", tops_color, "Bottoms:", bottoms_color)  # デバッグ用のログ

        # MySQLから指定した色のアイテムを取得
        tops_item = Item.query.filter_by(category='tops', color=tops_color).first()
        bottoms_item = Item.query.filter_by(category='bottoms', color=bottoms_color).first()

        # アイテムが見つからない場合のデフォルトURL
        default_url = "https://myclosetphoto.s3.ap-northeast-3.amazonaws.com/014%E9%BB%92%E3%83%AD%E3%83%B3%E3%82%B0%E3%82%B9%E3%82%AB%E3%83%BC%E3%83%88.png"
        
        # アイテムが存在する場合はそのURLを使用、存在しない場合はデフォルトURLを使用
        tops_image = tops_item.url if tops_item else default_url
        bottoms_image = bottoms_item.url if bottoms_item else default_url

        response = {
            "tops-image": tops_image,
            "bottoms-image": bottoms_image,
        }

        return jsonify(response), 200

    except Exception as e:
        print(f"Error occurred: {e}")
        return jsonify({'error': str(e)}), 500




# **************************************************************************

# コーデ提案画面とコーデ決定ボタン

# from flask import Blueprint

# coordinate_bp = Blueprint("coordinate_bp", __name__)
# @coordinate_bp.route('/')
# def index():
#  return "Hello,coordinate" 

# @coordinate_bp.route('/recommend')
# def recommend_index():
#  return "Hello, coordinate recommend" 



# from flask import Blueprint, request, jsonify
# from flask_sqlalchemy import SQLAlchemy
# # from flask_mysqldb import MySQL
# from app.services.ai_recommender import generate_outfit, parse_outfit_response

# coordinate_bp = Blueprint("coordinate_bp", __name__)

# # mysql = MySQL()
# db = SQLAlchemy()

# class Coordinate(db.Model):
#     __tablename__ = 'coordinates'
#     id = db.Column(db.Integer, primary_key=True)
#     tops_image = db.Column(db.String(255), nullable=False)
#     bottoms_image = db.Column(db.String(255), nullable=False)
#     date = db.Column(db.DateTime, nullable=False)

#     def __repr__(self):
#         return f'<Coordinate {self.id}>'

# # コーデボタンクリックすると　上下画像が出てきてコーデ提案をする
# @coordinate_bp.route('/recommend', methods=['POST'])
# def recommend_coordinate():
#     data = request.get_json()
    
#     # 仮のトップスとボトムスのリストを使用（実際のロジックで置き換える）
#     tops_list = ["top1", "top2", "top3"]
#     bottoms_list = ["bottom1", "bottom2", "bottom3"]
    
#     # ここで適切なトップスとボトムスを選択（実際のロジックで置き換える）
#     tops = tops_list[0] # ダミーデータ
#     bottoms = bottoms_list[0] # ダミーデータ

    
# # コーディネート提案のロジックを実装
#     generated_outfit = generate_outfit(tops, bottoms)
#     tops_color, bottoms_color = parse_outfit_response(generated_outfit)
# #色に基づいて画像を選択するロジックを実装
#     tops_image = f"https://myclosetphoto.s3.ap-northeast-3.amazonaws.com/{tops_color}_top_image.png" # 例: tops_color に基づいて画像URLを取得 
#     bottoms_image = f"https://myclosetphoto.s3.ap-northeast-3.amazonaws.com/{bottoms_color}_bottom_image.png" # 例: bottoms_color に基づいて画像URLを取得 

#     # tops_image = "https://myclosetphoto.s3.ap-northeast-3.amazonaws.com/001%E8%8A%B1%E6%9F%84%E3%83%AF%E3%83%B3%E3%83%94.png"
#     # bottoms_image = "https://myclosetphoto.s3.ap-northeast-3.amazonaws.com/010%E7%99%BD%E3%83%91%E3%83%B3%E3%83%84.png"
    
#     response = {
#         "tops-image": tops_image,
#         "bottoms-image": bottoms_image,
#         }

#     return jsonify(response), 200

# # コーデ決定ボタン（YES)を押すと　コーデセットが決定する
# @coordinate_bp.route('/', methods=['POST'])
# def coordinate():
#     data = request.get_json()
#     tops_image = data.get('tops-image')
#     bottoms_image = data.get('bottoms-image')
#     date = data.get('date')

#     # SQL Alchemyにデータを挿入する
#     new_coordinate = Coordinate(tops_image=tops_image, bottoms_image=bottoms_image, date=date)
#     db.session.add(new_coordinate)
#     db.session.commit()
 
#     response = {
#         "tops-image": tops_image,
#         "bottoms-image": bottoms_image,
#     }

#     return jsonify(response), 200
# *******************************************************************
# # 0105コメントアウト（AI挿入前）

# from flask import Blueprint, request, jsonify
# from flask_sqlalchemy import SQLAlchemy

# coordinate_bp = Blueprint("coordinate_bp", __name__)

# db = SQLAlchemy()

# class Item(db.Model):
#     __tablename__ = 'items'
#     id = db.Column(db.Integer, primary_key=True)
#     category = db.Column(db.String(50), nullable=False)  # 'tops' または 'bottoms'
#     color = db.Column(db.String(50), nullable=False)
#     url = db.Column(db.String(255), nullable=False)

# class Coordinate(db.Model):
#     __tablename__ = 'coordinates'
#     id = db.Column(db.Integer, primary_key=True)
#     tops_image = db.Column(db.String(255), nullable=False)
#     bottoms_image = db.Column(db.String(255), nullable=False)
#     date = db.Column(db.DateTime, nullable=False)

#     def __repr__(self):
#         return f'<Coordinate {self.id}>'

# # 何着ようかな？クリックすると、上下画像が出てきてコーデ提案をする
# @coordinate_bp.route('/recommend', methods=['POST'])
# def recommend_coordinate():
#     data = request.get_json()

#     # 仮の色を設定（あとでAIで色を決める実際のロジックに基づいて変更可能）
#     tops_color = 'white'  # 例: ユーザーのリクエストやAIの提案に基づいて設定
#     bottoms_color = 'black'  # 同上    
#     # tops_color = 'blue'  # 例: ユーザーのリクエストやAIの提案に基づいて設定
#     # bottoms_color = 'black'  # 同上

#     # MySQLから指定した色のアイテムを取得
#     tops_item = Item.query.filter_by(category='tops', color=tops_color).first()
#     bottoms_item = Item.query.filter_by(category='bottoms', color=bottoms_color).first()

#     # アイテムが見つからない場合のデフォルトURL
#     default_url = "https://myclosetphoto.s3.ap-northeast-3.amazonaws.com/014%E9%BB%92%E3%83%AD%E3%83%B3%E3%82%B0%E3%82%B9%E3%82%AB%E3%83%BC%E3%83%88.png"
    
#     # アイテムが存在する場合はそのURLを使用、存在しない場合はデフォルトURLを使用
#     tops_image = tops_item.url if tops_item else default_url
#     bottoms_image = bottoms_item.url if bottoms_item else default_url

#     response = {
#         "tops-image": tops_image,
#         "bottoms-image": bottoms_image,
#     }

#     return jsonify(response), 200

# # コーデ決定ボタン（YES)を押すと、コーデセットが決定する
# @coordinate_bp.route('/', methods=['POST'])
# def coordinate():
#     data = request.get_json()
#     tops_image = data.get('tops-image')
#     bottoms_image = data.get('bottoms-image')
#     date = data.get('date')

#     # SQLAlchemyにデータを挿入する
#     new_coordinate = Coordinate(tops_image=tops_image, bottoms_image=bottoms_image, date=date)
#     db.session.add(new_coordinate)
#     db.session.commit()
 
#     response = {
#         "tops-image": tops_image,
#         "bottoms-image": bottoms_image,
#     }

#     return jsonify(response), 200

# *******************************************************************
# # 0105挿入（AI挿入後）01051323コメントアウト

# from flask import Blueprint, request, jsonify
# from flask_sqlalchemy import SQLAlchemy
# from app.services.ai_recommender import generate_outfit, parse_outfit_response

# coordinate_bp = Blueprint("coordinate_bp", __name__)

# db = SQLAlchemy()

# class Item(db.Model):
#     __tablename__ = 'items'
#     id = db.Column(db.Integer, primary_key=True)
#     category = db.Column(db.String(50), nullable=False)  # 'tops' または 'bottoms'
#     color = db.Column(db.String(50), nullable=False)
#     url = db.Column(db.String(255), nullable=False)

# class Coordinate(db.Model):
#     __tablename__ = 'coordinates'
#     id = db.Column(db.Integer, primary_key=True)
#     tops_image = db.Column(db.String(255), nullable=False)
#     bottoms_image = db.Column(db.String(255), nullable=False)
#     date = db.Column(db.DateTime, nullable=False)

#     def __repr__(self):
#         return f'<Coordinate {self.id}>'

# # 何着ようかな？クリックすると、上下画像が出てきてコーデ提案をする
# @coordinate_bp.route('/recommend', methods=['POST'])
# def recommend_coordinate():
#     data = request.get_json()
#     tops = data.get('tops', [])
#     bottoms = data.get('bottoms', [])

#     if not tops or not bottoms:
#         return jsonify({'error': 'Tops and bottoms data are required'}), 400

#     try:
#         response = generate_outfit(tops, bottoms)
#         print("AI Response:", response)  # デバッグ用のログ

#         tops_color, bottoms_color = parse_outfit_response(response)
#         print("Parsed Colors - Tops:", tops_color, "Bottoms:", bottoms_color)  # デバッグ用のログ

#         # MySQLから指定した色のアイテムを取得
#         tops_item = Item.query.filter_by(category='tops', color=tops_color).first()
#         bottoms_item = Item.query.filter_by(category='bottoms', color=bottoms_color).first()

#         # アイテムが見つからない場合のデフォルトURL
#         default_url = "https://myclosetphoto.s3.ap-northeast-3.amazonaws.com/014%E9%BB%92%E3%83%AD%E3%83%B3%E3%82%B0%E3%82%B9%E3%82%AB%E3%83%BC%E3%83%88.png"
        
#         # アイテムが存在する場合はそのURLを使用、存在しない場合はデフォルトURLを使用
#         tops_image = tops_item.url if tops_item else default_url
#         bottoms_image = bottoms_item.url if bottoms_item else default_url

#         response = {
#             "tops-image": tops_image,
#             "bottoms-image": bottoms_image,
#         }

#         return jsonify(response), 200

#     except Exception as e:
#         print(f"Error occurred: {e}")
#         return jsonify({'error': str(e)}), 500

# # コーデ決定ボタン（YES)を押すと、コーデセットが決定する
# @coordinate_bp.route('/', methods=['POST'])
# def coordinate():
#     data = request.get_json()
#     tops_image = data.get('tops-image')
#     bottoms_image = data.get('bottoms-image')
#     date = data.get('date')

#     # SQLAlchemyにデータを挿入する
#     new_coordinate = Coordinate(tops_image=tops_image, bottoms_image=bottoms_image, date=date)
#     db.session.add(new_coordinate)
#     db.session.commit()
 
#     response = {
#         "tops-image": tops_image,
#         "bottoms-image": bottoms_image,
#     }

#     return jsonify(response), 200

# *************************************************************




