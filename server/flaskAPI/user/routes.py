from flask import Blueprint, jsonify
from user.models import User

user_bp = Blueprint('user', __name__)

@user_bp.route('/user/signup', methods=['POST', 'GET'])
def signUp():
    return jsonify(User().signup())