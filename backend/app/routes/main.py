from flask import Blueprint, jsonify
from app.services.db_service import get_tops_and_bottoms
from app.services.db_service import get_outfit_recommendation

main = Blueprint('main', __name__)

@main.route('/api/get-images', methods=['GET'])
def get_images():
    images = get_tops_and_bottoms()
    return jsonify(images)

@main.route('/api/outfit', methods=['GET'])
def get_outfit():
    outfit = get_outfit_recommendation()
    if outfit:
        return jsonify(outfit)
    else:
        return jsonify({"error": "Unable to generate outfit recommendation"}), 400
