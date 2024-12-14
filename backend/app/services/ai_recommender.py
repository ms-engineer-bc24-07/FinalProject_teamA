import os
from config import Config
import openai

# 環境変数からAPIキーを取得
openai.api_key = Config.OPENAI_API_KEY

def generate_outfit(tops, bottoms):
    prompt = f"""
    トップス: {[tops['color'] for tops in tops]}
    ボトムス: {[bottoms['color'] for bottoms in bottoms]}
    
    上記のトップスとボトムスの中から、色が重複しないようにコーディネートを1つ提案してください。
    回答は以下の形式で返してください：
    トップス: [色]
    ボトムス: [色]
    """

    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=prompt,
        max_tokens=50,
        n=1,
        stop=None,
        temperature=0.7,
    )

    return response.choices[0].text.strip()

def parse_outfit_response(response):
    lines = response.split('\n')
    tops_color = lines[0].split(':')[1].strip()
    bottoms_color = lines[1].split(':')[1].strip()
    return tops_color, bottoms_color



#以下あけぴさんの当初のコードです（一旦保留させてください）
# # AIコーディネート生成
# import openai
# from config import Config

# openai.api_key = Config.OPENAI_API_KEY

# def generate_prompt(user, items, tpo):
#     """
#     プロンプト生成用の関数。
#     """
#     item_list = "\n".join([f"- {item['item']} ({item['color']}, {item['tag']})" for item in items])

#     return (
#         f"あなたはファッションスタイリストです。以下の情報をもとに、TPO（{tpo}）に適した"
#         f"コーディネートを提案してください。\n\n"
#         f"### ユーザー情報\n"
#         f"性別: {user['gender']}\n"
#         f"好みのタグ: {', '.join(user.get('preferred_tags', []))}\n\n"
#         f"### 使用可能なアイテム\n{item_list}\n\n"
#         f"### 提案の条件\n"
#         f"- 使用可能なアイテムを組み合わせる\n"
#         f"- TPOに合った提案をする\n"
#     )

# def get_ai_recommendation(prompt):
#     """
#     OpenAI APIを使用してコーディネート提案を取得する。
#     """
#     response = openai.Completion.create(
#         engine="text-davinci-003",
#         prompt=prompt,
#         max_tokens=300,
#         temperature=0.7
#     )
#     return response.choices[0].text.strip()
