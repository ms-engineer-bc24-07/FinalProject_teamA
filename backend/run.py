import firebase_admin
from firebase_admin import credentials, auth
from app import create_app

# Flaskアプリケーションを作成
app = create_app()

# Firebase Admin SDKの初期化
cred = credentials.Certificate('./finalprojectteama-firebase-adminsdk-k1fzq-60a6697bcc.json')  
# ダウンロードした認証ファイルを指定
firebase_admin.initialize_app(cred)

if __name__ == '__main__':
    app.run(debug=True)
    # 本番環境にデプロイする際は debug=False にすることをお勧め？（GPT）

