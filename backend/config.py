import os

   # 設定ファイル
class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    # SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://username:password@localhost:3306/mycloset01'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        f"mysql+pymysql://{os.environ.get('DB_USERNAME')}:{os.environ.get('DB_PASSWORD')}@localhost/myclosetapp"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')
    AWS_ACCESS_KEY_ID = 'your_access_key_id'
    AWS_SECRET_ACCESS_KEY = 'your_secret_access_key'


