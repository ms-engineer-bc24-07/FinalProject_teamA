from app import db

class Item(db.Model):
    __tablename__ = 'items'
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(20), nullable=False)
    color = db.Column(db.String(20), nullable=False)
    url = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'category': self.category,
            'color': self.color,
            'url': self.url
        }
