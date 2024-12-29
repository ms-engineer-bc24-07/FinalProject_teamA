# import os

#    # 設定ファイル
# class Config:
#     SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
#     # SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://username:password@localhost:3306/mycloset01'
#     SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
#         f"mysql+pymysql://{os.environ.get('DB_USERNAME')}:{os.environ.get('DB_PASSWORD')}@localhost/myclosetapp"
#     SQLALCHEMY_TRACK_MODIFICATIONS = False
#     OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')
#     AWS_ACCESS_KEY_ID = 'your_access_key_id'
#     AWS_SECRET_ACCESS_KEY = 'your_secret_access_key'

from dotenv import load_dotenv
import os

load_dotenv()  # .env ファイルから環境変数を読み込む

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY') or 'you-will-never-guess'
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL') or \
        f"mysql+pymysql://{os.getenv('DB_USERNAME')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}/{os.getenv('DB_NAME')}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
    AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
    AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
    AWS_REGION = os.getenv('AWS_REGION')
    S3_BUCKET_NAME = os.getenv('S3_BUCKET_NAME')

# デバッグメッセージ
print("DATABASE_URL:", os.getenv('DATABASE_URL'))
print("DB_USERNAME:", os.getenv('DB_USERNAME'))
print("DB_PASSWORD:", os.getenv('DB_PASSWORD'))
print("DB_HOST:", os.getenv('DB_HOST'))
print("DB_NAME:", os.getenv('DB_NAME'))
print("AWS_ACCESS_KEY_ID:", os.getenv('AWS_ACCESS_KEY_ID'))
print("AWS_SECRET_ACCESS_KEY:", os.getenv('AWS_SECRET_ACCESS_KEY'))
print("AWS_REGION:", os.getenv('AWS_REGION'))
print("S3_BUCKET_NAME:", os.getenv('S3_BUCKET_NAME'))
print("OPENAI_API_KEY:", os.getenv('OPENAI_API_KEY'))

