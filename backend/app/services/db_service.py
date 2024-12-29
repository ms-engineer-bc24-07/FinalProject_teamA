import mysql.connector
from mysql.connector import Error

def get_connection():
    try:
        connection = mysql.connector.connect(
            host='localhost',  # データベースホスト名
            user='root',  # データベースユーザー名
            password='MysqL1515@',  # データベースパスワード
            database='myclosetapp'  # データベース名
        )
        return connection
    except Error as e:
        print(f"Error while connecting to MySQL: {e}")
        return None

def get_tops_and_bottoms():
    connection = get_connection()
    if connection is None:
        return None, None

    cursor = connection.cursor(dictionary=True)

    cursor.execute("SELECT * FROM items WHERE category = 'tops'")
    tops = cursor.fetchall()

    cursor.execute("SELECT * FROM items WHERE category = 'bottoms'")
    bottoms = cursor.fetchall()

    connection.close()
    return tops, bottoms

def get_outfit_recommendation():
    tops, bottoms = get_tops_and_bottoms()
    if not tops or not bottoms:
        return None

    import random
    attempts = 10  # トライ回数を設定
    for _ in range(attempts):
        recommended_top = random.choice(tops)
        recommended_bottom = random.choice(bottoms)
        # 同じ色の組み合わせを避ける
        if recommended_top['color'] != recommended_bottom['color']:
            # S3 URLをローカルの画像ファイル名に変換
            top_filename = recommended_top['url'].split('/')[-1]
            bottom_filename = recommended_bottom['url'].split('/')[-1]

            return {
                'top': top_filename,
                'bottom': bottom_filename,
                'recommendation': f"トップス: {recommended_top['color']}\nボトムス: {recommended_bottom['color']}"
            }

    # トライ回数内に異なる色の組み合わせが見つからなかった場合
    recommended_top = random.choice(tops)
    recommended_bottom = random.choice(bottoms)
    top_filename = recommended_top['url'].split('/')[-1]
    bottom_filename = recommended_bottom['url'].split('/')[-1]
    return {
        'top': top_filename,
        'bottom': bottom_filename,
        'recommendation': f"トップス: {recommended_top['color']}\nボトムス: {recommended_bottom['color']}"
    }
