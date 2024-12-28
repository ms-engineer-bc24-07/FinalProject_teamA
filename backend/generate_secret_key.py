import secrets

# ランダムな秘密鍵を生成
secret_key = secrets.token_hex(16)
print(secret_key)
