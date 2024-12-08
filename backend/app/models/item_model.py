# アイテム関連のデータ処理

from sqlalchemy import create_engine, text
from config import Config

engine = create_engine(Config.SQLALCHEMY_DATABASE_URI)

def fetch_user_items(user_id, preferred_colors, preferred_tag):
    """
    DBからユーザーのアイテムを取得する。
    """
    with engine.connect() as conn:
        query = text("""
            SELECT id, item, color, image_url, tag
            FROM items
            WHERE user_id = :user_id
            AND color IN :preferred_colors
            AND tag LIKE :preferred_tag
            ORDER BY created_at DESC
        """)
        result = conn.execute(query, {
            'user_id': user_id,
            'preferred_colors': tuple(preferred_colors),
            'preferred_tag': f"%{preferred_tag}%"
        })
        return [dict(row) for row in result]
