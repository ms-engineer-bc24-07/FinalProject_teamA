import firebase_admin
from firebase_admin import credentials, auth

# Firebaseの設定ファイルを読み込む
cred = credentials.Certificate('finalproject-dayzy-firebase-adminsdk-cgsd0-41718e8590.json')
firebase_admin.initialize_app(cred)

def verify_token(id_token):
    try:
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token
    except Exception as e:
        return None
