from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import Config
import boto3
import openai
from flask_migrate import Migrate
from app.routes.items import items_bp
from app.routes.main import main
from app.routes.users import users_bp
from app.routes.coordinate import coordinate_bp
from app.routes.users import db, User
from dotenv import load_dotenv
from app.utils.db import db

load_dotenv()

db = SQLAlchemy()
s3 = None

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(Config)

    db.init_app(app)  # SQL Alchemyデータベースを初期化
    migrate = Migrate(app, db) # Flask-Migrateを初期化
    
    # 環境変数を読み込んだ直後に値を確認
    print("AWS_REGION:", app.config['AWS_REGION'])
    print("AWS_ACCESS_KEY_ID:", app.config['AWS_ACCESS_KEY_ID'])
    print("AWS_SECRET_ACCESS_KEY:", app.config['AWS_SECRET_ACCESS_KEY'])
    print("S3_BUCKET_NAME:", app.config['S3_BUCKET_NAME'])
    print("DB_HOST:", app.config.get('DB_HOST')) 
    
    
    # S3クライアントの初期化
    global s3
    s3 = boto3.client('s3',
                      aws_access_key_id=app.config['AWS_ACCESS_KEY_ID'],
                      aws_secret_access_key=app.config['AWS_SECRET_ACCESS_KEY'],
                      region_name=app.config['AWS_REGION'])

    # OpenAI APIキーの設定
    openai.api_key = app.config['OPENAI_API_KEY']

    with app.app_context():
        db.create_all()
        app.register_blueprint(main)
        app.register_blueprint(items_bp, url_prefix="/api/items")
        app.register_blueprint(coordinate_bp, url_prefix="/api/coordinate")
        app.register_blueprint(users_bp, url_prefix="/api/users")

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
