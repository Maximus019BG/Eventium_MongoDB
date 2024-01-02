from flask import Blueprint, request, jsonify
from user.models import User
from flask_cors import CORS 


user_bp = Blueprint('user', __name__)



@user_bp.route('/user/signup', methods=['POST'])
def sign_up():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    user_instance = User()
    user_data = user_instance.signup(name, email, password)

    return user_data 
