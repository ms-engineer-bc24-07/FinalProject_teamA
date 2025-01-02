from flask import Blueprint, request, jsonify
from ..services.firebase_service import verify_token

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/verify', methods=['POST'])
def verify_user():
    id_token = request.json.get('id_token')
    decoded_token = verify_token(id_token)
    if decoded_token:
        return jsonify({"message": "認証成功", "uid": decoded_token['uid']}), 200
    else:
        return jsonify({"message": "認証失敗"}), 401