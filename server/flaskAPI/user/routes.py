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

    return jsonify(user_data)

@user_bp.route('/user/signin', methods=['POST'])
def sign_in():
    data = request.get_json()
    email = data.get('email')
    entered_password = data.get('password')

    user_instance = User()
    user_data = user_instance.get_user_by_email(email)

    if user_data:
        encrypted_password = user_data.get('password')
        
        # Decrypt the stored encrypted password
        decrypted_password = user_instance.decrypt_password(encrypted_password)

        # Compare the entered password with the decrypted password
        if entered_password == decrypted_password:
            return jsonify({'message': 'Sign-in successful'})
    
    return jsonify({'message': 'Invalid email or password'})
