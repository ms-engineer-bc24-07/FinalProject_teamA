from flask import Blueprint

items_bp = Blueprint("items", __name__)
@items_bp.route('/')
def index():
 return "Hello,items" 