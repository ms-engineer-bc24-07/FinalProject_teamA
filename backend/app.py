from flask import Flask, send_from_directory, jsonify
import os

app = Flask(__name__)

# プロジェクトルートの画像フォルダパス
IMAGE_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'photo')

@app.route('/images/<path:filename>')
def serve_image(filename):
    return send_from_directory(IMAGE_FOLDER, filename)

@app.route('/api/outfit')
def get_outfit():
    # 例: データベースや他のデータソースから取得した画像パスを含むデータ
    outfit = {
        'top': '/images/002緑Tシャツ.png',
        'bottom': '/images/006花柄シャツ.png',
        'recommendation': "トップス: green\nボトムス: pink"
    }
    return jsonify(outfit)

if __name__ == '__main__':
    app.run(debug=True)
