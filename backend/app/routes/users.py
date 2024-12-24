# from flask import Blueprint

# users_bp = Blueprint("users", __name__)
# @users_bp.route('/')
# def index():
#  return "Hello, users" 


from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from app.db.usersdb import db, User
from datetime import datetime

users_bp = Blueprint("users", __name__)

@users_bp.route('/', methods=['POST'])
def create_user():
    data = request.get_json()
    
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    birthday = data.get('birthday')
    
    if not username or not email or not password:
        return jsonify({"error": "ユーザー名、メールアドレスまたはパスワードが間違っています"}), 400
    
    # パスワードをハッシュ化
    hashed_password = generate_password_hash(password, method='sha256')
    
    # 新しいユーザーの作成
    new_user = User(
        username=username,
        email=email,
        password=hashed_password,
        birthday=datetime.strptime(birthday, '%Y-%m-%d') if birthday else None
        )
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"message": "ユーザー情報が登録されました"}), 201
