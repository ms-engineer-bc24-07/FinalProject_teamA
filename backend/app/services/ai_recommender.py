# ランダムに色選びをお願いしたい（最新版修正中）
import os
from config import Config
import openai
import random

# 環境変数からAPIキーを取得
openai.api_key = Config.OPENAI_API_KEY

def generate_outfit(tops, bottoms):
    # ランダムな色を生成
    colors = ["white", "black", "brown", "khaki", "navy", "beige", "red", "blue", "yellow", "purple", "green", "pink"]
    random_top = random.choice(colors)
    random_bottom = random.choice([color for color in colors if color != random_top])
    
    prompt = f"""
    tops: {random_top}
    bottoms: {random_bottom}

    上記のトップスとボトムスの中から、色が重複しないようにコーディネートを1つ提案してください。
    色は、white、black, brown, khaki, navy, beige, red, blue, yellow, purple, green, pinkの中で選びます。
    回答は以下の形式で返してください：
    tops: [color]
    bottoms: [color]
    """

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=50,
        n=1,
        stop=None,
        temperature=0.9,  # 温度を0.9に設定してランダム性を高める
    )

    return response.choices[0].message['content'].strip()

def parse_outfit_response(response):
    # バッククォートを削除
    response = response.replace('```', '').strip()
    lines = response.split('\n')
    if len(lines) < 2:
        raise ValueError("Invalid response format")
    
    tops_color = lines[0].split(':')[1].strip().replace('[', '').replace(']', '').replace("'", "")
    bottoms_color = lines[1].split(':')[1].strip().replace('[', '').replace(']', '').replace("'", "")
    
    return tops_color, bottoms_color





# *************************************************************
# # AIが他の色を持ってこれるように再構築したコード（白と茶色ばかり提案してくる）

# import os
# from config import Config
# import openai

# # 環境変数からAPIキーを取得
# openai.api_key = Config.OPENAI_API_KEY

# def generate_outfit(tops, bottoms):
#     prompt = f"""
#     tops: {[top['color'] for top in tops]}
#     bottoms: {[bottom['color'] for bottom in bottoms]}
    
#     上記のトップスとボトムスの中から、色が重複しないようにコーディネートを1つ提案してください。
#     色は、white、black, brown, khaki, navy, beige, red, blue, yellow, purple, green, pinkの中で選びます。
#     回答は以下の形式で返してください：
#     tops: [color]
#     bottoms: [color]
#     """

#     response = openai.ChatCompletion.create(
#         model="gpt-3.5-turbo",
#         messages=[
#             {"role": "system", "content": "You are a helpful assistant."},
#             {"role": "user", "content": prompt}
#         ],
#         max_tokens=50,
#         n=1,
#         stop=None,
#         temperature=0.7,
#     )

#     return response.choices[0].message['content'].strip()

# def parse_outfit_response(response):
#     # バッククォートを削除
#     response = response.replace('```', '').strip()
#     lines = response.split('\n')
#     if len(lines) < 2:
#         raise ValueError("Invalid response format")
    
#     tops_color = lines[0].split(':')[1].strip().replace('[', '').replace(']', '').replace("'", "")
#     bottoms_color = lines[1].split(':')[1].strip().replace('[', '').replace(']', '').replace("'", "")
    
#     return tops_color, bottoms_color


# ***************************************************************

# 01051318白と黒ばかり提案してくるのはなぜか、解明するので一旦コメントアウトする

# import os
# from config import Config
# import openai

# # 環境変数からAPIキーを取得
# openai.api_key = Config.OPENAI_API_KEY

# def generate_outfit(tops, bottoms):
#     prompt = f"""
#     tops: {[top['color'] for top in tops]}
#     bottoms: {[bottom['color'] for bottom in bottoms]}
    
#     上記のトップスとボトムスの中から、色が重複しないようにコーディネートを1つ提案してください。
#     色は、white、black, brown, khaki, navy, beige, red, blue, yellow, purple, green, pinkの中で選びます。
#     回答は以下の形式で返してください：
#     tops: [color]
#     bottoms: [color]
#     """

#     response = openai.ChatCompletion.create(
#         model="gpt-3.5-turbo",
#         messages=[
#             {"role": "system", "content": "You are a helpful assistant."},
#             {"role": "user", "content": prompt}
#         ],
#         max_tokens=50,
#         n=1,
#         stop=None,
#         temperature=0.7,
#     )

#     return response.choices[0].message['content'].strip()

# def parse_outfit_response(response):
#     # バッククォートを削除
#     response = response.replace('```', '').strip()
#     lines = response.split('\n')
#     if len(lines) < 2:
#         raise ValueError("Invalid response format")
    
#     # 修正: 配列ではなく単一の文字列を解析
#     tops_color = lines[0].split(':')[1].strip().replace('[', '').replace(']', '').replace("'", "")
#     bottoms_color = lines[1].split(':')[1].strip().replace('[', '').replace(']', '').replace("'", "")
    
#     return tops_color, bottoms_color


#*************************************************

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
