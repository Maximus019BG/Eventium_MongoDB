from flask import Blueprint, jsonify, request
from user.models import User

user_bp = Blueprint('user', __name__)

@user_bp.route('/user/signup', methods=['POST','GET'])
def signUp():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    user_instance = User()
    user_data = user_instance.signup(name, email, password)

    return user_data 