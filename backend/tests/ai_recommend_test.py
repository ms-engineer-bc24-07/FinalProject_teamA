# コーディネート提案に使うOpenAI APIのテスト

import openai
from dotenv import load_dotenv #pythonで環境変数を管理するライブラリ（.envに書き込んだ内容をプログラム内で参照できる）
import os

# .env ファイルを読み込む
load_dotenv()

# 環境変数から API キーを取得
openai.api_key = os.getenv("OPENAI_API_KEY")

# APIリクエストを送信
response = openai.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "あなたはファッションスタイリストです。"},
        {"role": "user", "content": "白いシャツと青いジーンズでおすすめのコーディネートを教えてください。"}
    ]
)

# 正しい方法でresponseオブジェクトからデータを取得
print(response.choices[0].message.content)
