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
