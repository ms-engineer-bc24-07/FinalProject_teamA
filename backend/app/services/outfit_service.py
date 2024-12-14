from app.models.clothes import Clothes
from app import db
import openai

def get_outfit_recommendation():
    tops = Clothes.query.filter_by(type='tops').all()
    bottoms = Clothes.query.filter_by(type='bottoms').all()

    # OpenAI APIを使用してコーディネートを生成
    prompt = f"トップス: {[t.color for t in tops]}\nボトムス: {[b.color for b in bottoms]}\n同じ色を使わないコーディネートを提案してください。"
    
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=prompt,
        max_tokens=100
    )

    recommendation = response.choices[0].text.strip()

    # 推奨されたコーディネートに基づいて洋服を選択
    # この部分は実際の推奨テキストの解析に応じて調整が必要です
    recommended_top = next((t for t in tops if t.color in recommendation), None)
    recommended_bottom = next((b for b in bottoms if b.color in recommendation), None)

    return {
        'tops': recommended_top.to_dict() if recommended_top else None,
        'bottoms': recommended_bottom.to_dict() if recommended_bottom else None,
        'recommendation': recommendation
    }
