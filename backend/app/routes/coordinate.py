from flask import Blueprint

coordinate_bp = Blueprint("coordinate", __name__)
@coordinate_bp.route('/')
def index():
 return "Hello,coordinate" 