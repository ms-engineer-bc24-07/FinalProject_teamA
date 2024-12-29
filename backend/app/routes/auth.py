from firebase_admin import auth

def verify_firebase_token(id_token):
    try:
        # IDトークンを検証
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token  # 成功した場合、デコードされたトークン情報を返す
    except auth.InvalidIdTokenError:
        return None  # 無効なトークンの場合はNoneを返す
