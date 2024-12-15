from flask import Blueprint, jsonify, send_from_directory
from app.services.db_service import get_tops_and_bottoms, get_outfit_recommendation
import os
from urllib.parse import unquote

main = Blueprint('main', __name__)

# プロジェクトルートの画像フォルダパス
IMAGE_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'photo')

@main.route('/images/<path:filename>', methods=['GET'])
def serve_image(filename):
    try:
        decoded_filename = unquote(filename)
        file_path = os.path.join(IMAGE_FOLDER, decoded_filename)
        print(f"Serving file from: {file_path}")  # 追加ログ
        if os.path.exists(file_path):
            return send_from_directory(IMAGE_FOLDER, decoded_filename)
        else:
            print(f"File not found: {file_path}")
            return "File not found", 404
    except Exception as e:
        print(f"Error serving image: {e}")
        return "Internal server error", 500

@main.route('/api/get-images', methods=['GET'])
def get_images():
    tops, bottoms = get_tops_and_bottoms()
    if tops is None or bottoms is None:
        return jsonify({"error": "Unable to fetch images"}), 500
    return jsonify({'tops': tops, 'bottoms': bottoms})

@main.route('/api/outfit', methods=['GET'])
def get_outfit():
    try:
        outfit = get_outfit_recommendation()
        if outfit:
            print(f"Recommended top: {outfit['top']}, bottom: {outfit['bottom']}")  # 追加ログ
            # 画像パスをフロントエンドが読み取れる形で変更
            outfit['top'] = f"/images/{outfit['top']}"
            outfit['bottom'] = f"/images/{outfit['bottom']}"
            print(f"Modified top path: {outfit['top']}, bottom path: {outfit['bottom']}")  # 追加ログ
            return jsonify(outfit), 200
        else:
            return jsonify({"error": "No suitable outfit found"}), 404
    except Exception as e:
        print(f"Error in get_outfit: {str(e)}")  # サーバーログにエラーを出力
        return jsonify({"error": "Internal server error", "details": str(e)}), 500

