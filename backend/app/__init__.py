
#以下ゆかりん作成ファイルです12/14
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  # この行を追加
from config import Config
import boto3
import openai  # この行を追加
from app.routes.items import items_bp
from app.routes.main import main
from app.routes.users import users_bp
from app.routes.coordinate import coordinate_bp
from app.db.usersdb import db, User
# from app.routes.items_analyze import items_analyze_bp

db = SQLAlchemy()
s3 = None

def create_app():
    app = Flask(__name__)
    CORS(app)  # この行を追加
    app.config.from_object(Config)

    db.init_app(app)# データベースを初期化

    # S3クライアントの初期化
    global s3
    s3 = boto3.client('s3',
        aws_access_key_id=app.config['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=app.config['AWS_SECRET_ACCESS_KEY']
    )

# OpenAI APIキーの設定
    openai.api_key = app.config['OPENAI_API_KEY']  # この行を追加
    with app.app_context():
        app.register_blueprint(main)
        app.register_blueprint(items_bp, url_prefix="/items")
        app.register_blueprint(coordinate_bp, url_prefix="/coordinate")
        app.register_blueprint(users_bp, url_prefix="/users")
        # app.register_blueprint(items/analyze_bp, url_prefix="/items/analyze")
        # app.register_blueprint(coordinate_bp, url_prefix="/coordinate/recommend")
        
        

    @app.route('/')
    def index():
        return jsonify({"message": "Welcome to the My Closet App!"})

    @app.route('/test')
    def test_connections():
        # データベース接続テスト
        try:
            db.session.query("1").from_statement("SELECT 1").all()
            db_status = "Database connection successful"
        except Exception as e:
            db_status = f"Database connection failed: {str(e)}"

        # S3接続テスト
        try:
            s3.list_buckets()
            s3_status = "S3 connection successful"
        except Exception as e:
            s3_status = f"S3 connection failed: {str(e)}"

        return f"Database: {db_status}<br>S3: {s3_status}"

    return app
