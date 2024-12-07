# コーディネート提案
# エンドポイントの実装。ユーザー情報や条件を受け取り、AI提案を返す。
from flask import Blueprint, request, jsonify
from models.item_model import fetch_user_items
from services.ai_recommender import generate_prompt, get_ai_recommendation

recommendation_bp = Blueprint('recommendation', __name__)

@recommendation_bp.route('/recommendation', methods=['POST'])
def recommend():
    data = request.json
    user_id = data['user_id']
    tpo = data['tpo']
    preferred_colors = data['preferred_colors']
    preferred_tag = data['preferred_tag']

    # DBからアイテムを取得
    items = fetch_user_items(user_id, preferred_colors, preferred_tag)

    # プロンプト生成
    user_info = {"gender": data['gender'], "preferred_tags": [preferred_tag]}
    prompt = generate_prompt(user_info, items, tpo)

    # OpenAI APIで提案を取得
    recommendation = get_ai_recommendation(prompt)

    return jsonify({"recommendation": recommendation})
