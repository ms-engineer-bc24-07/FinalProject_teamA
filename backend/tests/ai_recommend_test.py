# # コーディネート提案に使うOpenAI APIのテスト

# import openai
# from dotenv import load_dotenv #pythonで環境変数を管理するライブラリ（.envに書き込んだ内容をプログラム内で参照できる）
# import os

# # .env ファイルを読み込む
# load_dotenv()

# # 環境変数から API キーを取得
# openai.api_key = os.getenv("OPENAI_API_KEY")

# # APIリクエストを送信
# response = openai.chat.completions.create(
#     model="gpt-4",
#     messages=[
#         {"role": "system", "content": "あなたはファッションスタイリストです。"},
#         {"role": "user", "content": "白いシャツと青いジーンズでおすすめのコーディネートを教えてください。"}
#     ]
# )

# # 正しい方法でresponseオブジェクトからデータを取得
# print(response.choices[0].message.content)




# AIコーディネート生成
from ..config import Config
import openai

openai.api_key = Config.OPENAI_API_KEY

def generate_prompt(user, items, tpo):
    """
    プロンプト生成用の関数。
    """
    item_list = "\n".join([f"- {item['item']} ({item['color']}, {item['tag']})" for item in items])

    return (
        f"あなたはファッションスタイリストです。以下の情報をもとに、TPO（{tpo}）に適した"
        f"コーディネートを提案してください。\n\n"
        f"### ユーザー情報\n"
        f"性別: {user['gender']}\n"
        f"好みのタグ: {', '.join(user.get('preferred_tags', []))}\n\n"
        f"### 使用可能なアイテム\n{item_list}\n\n"
        f"### 提案の条件\n"
        f"- 使用可能なアイテムを組み合わせる\n"
        f"- TPOに合った提案をする\n"
    )

def get_ai_recommendation(prompt):
    """
    OpenAI APIを使用してコーディネート提案を取得する。
    """
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=300,
        temperature=0.7
    )
    return response.choices[0].text.strip()