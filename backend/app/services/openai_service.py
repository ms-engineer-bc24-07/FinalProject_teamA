import os
import openai
from typing import List, Dict, Tuple
from flask import current_app

def get_openai_api_key():
    return current_app.config['OPENAI_API_KEY']

def generate_outfit(tops: List[Dict], bottoms: List[Dict]) -> str:
    openai.api_key = get_openai_api_key()
    
    prompt = f"""
    トップス: {[tops['color'] for tops in tops]}
    ボトムス: {[bottoms['color'] for bottoms in bottoms]}
    
    上記のトップスとボトムスの中から、色が重複しないようにコーディネートを1つ提案してください。
    回答は以下の形式で返してください：
    トップス: [色]
    ボトムス: [色]
    """

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "あなたはファッションコーディネーターです。"},
                {"role": "user", "content": prompt}
            ],
            max_tokens=50,
            n=1,
            temperature=0.7,
        )
        return response.choices[0].message.content.strip()
    except openai.error.OpenAIError as e:
        print(f"OpenAI API error: {e}")
        return "コーディネートの生成に失敗しました。"

# def parse_outfit_response(response: str) -> Tuple[str, str]:
#     lines = response.split('\n')
#     if len(lines) < 2:
#         return "不明", "不明"
#     tops_color = lines[0].split(':')[1].strip() if ':' in lines[0] else "不明"
#     bottoms_color = lines[1].split(':')[1].strip() if ':' in lines[1] else "不明"
#     return tops_color, bottoms_color

def parse_outfit_response(response: str) -> Tuple[str, str]:
    lines = response.split('\n')
    if len(lines) < 2:
        return "不明", "不明"
    tops_color = lines[0].split(':')[1].strip().strip("[]'") if ':' in lines[0] else "不明"
    bottoms_color = lines[1].split(':')[1].strip().strip("[]'") if ':' in lines[1] else "不明"
    return tops_color, bottoms_color
