  
from flask import Blueprint, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_mysqldb import MySQL


users_bp = Blueprint("users_bp", __name__)

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    # username = db.Column(db.String(16), unique=True, nullable=False)
    # password = db.Column(db.String(32), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    # birthday = db.Column(db.Date, nullable=True)
    # create_time = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
        
@users_bp.route('/', methods=['POST'])
def create_user():
    data = request.get_json()
    # username = data.get('username')
    email = data.get('email')
    # birthday = data.get('birthday')
    
    # 入力チェック
    if not email :
        return jsonify({"error": "メールアドレスが必要です"}), 400
    
    try:
        new_user = User(
            # username=username,
            email=email
            # birthday=datetime.strptime(birthday, '%Y-%m-%d') if birthday else None
        )
        
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({"message": "ユーザー情報が登録されました"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@users_bp.route('/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.get_json()
    
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({"error": "ユーザーが見つかりません"}), 404
    
    # username = data.get('username')
    email = data.get('email')
    # birthday = data.get('birthday')
    
    # if username:
    #     user.username = username
    if email:
        user.email = email
    # if birthday:
    #     user.birthday = datetime.strptime(birthday, '%Y-%m-%d')
    
    db.session.commit()
    
    return jsonify({"message": "ユーザー情報が更新されました"}), 200

@users_bp.route('/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({"error": "ユーザーが見つかりません"}), 404
    
    db.session.delete(user)
    db.session.commit()
    
    return jsonify({"message": "ユーザー情報が削除されました"}), 200

@users_bp.route('/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "ユーザーが見つかりません"}), 404
    
    return jsonify({
        "id": user.id,
        # "username": user.username,
        "email": user.email,
        # "birthday": user.birthday.strftime('%Y-%m-%d') if user.birthday else None,
        # "create_time": user.create_time.strftime('%Y-%m-%d %H:%M:%S')
    }), 200



# from flask import Blueprint, request, jsonify
# from app.utils.db import db
# from app.db.usersdb import User
# from datetime import datetime

# users_bp = Blueprint("users_bp", __name__)

# @users_bp.route('/api/users', methods=['POST'])
# def create_user():
#     data = request.get_json()
#     username = data.get('username')
#     email = data.get('email')
#     birthday = data.get('birthday')
    
#     if not username or not email or not birthday:
#         return jsonify({"error": "ユーザー名、メールアドレス、生年月日が必要です"}), 400
    
#     try:
#         new_user = User(
#             username=username,
#             email=email,
#             birthday=datetime.strptime(birthday, '%Y-%m-%d') if birthday else None
#         )
        
#         db.session.add(new_user)
#         db.session.commit()
        
#         return jsonify({"message": "ユーザー情報が登録されました"}), 201
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": str(e)}), 500
