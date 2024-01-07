import os
from flask import Flask, jsonify, request, session
from flask_cors import CORS
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from passlib.hash import bcrypt
from pymongo import MongoClient
from datetime import timedelta
from user.models import User
from user.routes import user_bp
from flask_session import Session


app = Flask(__name__)
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)
CORS(app)
app.register_blueprint(user_bp)
app.secret_key = os.environ.get("FLASK_SECRET_KEY", "your_default_secret_key")
app.permanent_session_lifetime = timedelta(days=5)

# Initialize Flask-Login
login_manager = LoginManager(app)
login_manager.login_view = "login"

# Initialize Flask-Session
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

# Load MongoDB credentials from environment variables
password = os.environ.get("MONGODB_PWD")
connection_string = f"mongodb+srv://maxralev:{password}@cluster1.hn9gicg.mongodb.net/?retryWrites=true&w=majority&ssl=true&tlsAllowInvalidCertificates=true"
client = MongoClient(connection_string)
db = client["EventiumDatabase"]  # Replace with your actual database name
users_collection = db["Users"]  # Replace with your actual collection name

class User(UserMixin):
    def __init__(self, user_id, name):
        self.id = str(user_id)
        self.name = name

    @staticmethod
    def get(user_id):
        user_data = users_collection.find_one({"_id": user_id})
        if user_data:
            return User(user_data["_id"], user_data["name"])
        return None

@login_manager.user_loader
def load_user(user_id):
    return User.get(user_id)


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    name = data.get("name")
    password = data.get("password")

    user_data = users_collection.find_one({"name": name})

    if user_data and bcrypt.verify(password, user_data.get("password")):
        user = User(str(user_data["_id"]), user_data["name"])
        login_user(user)
        session["user_id"] = str(user.id)
        session["name"] = user.name  # Store user's name in the session
        print("Session set:", session)
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401
    



@app.route("/logout", methods=["POST"])
@login_required
def logout():
    session.pop("user_id", None)
    logout_user()
    return jsonify({"message": "Logout successful"}), 200


@app.route("/check_session", methods=["GET"])
def check_session():
    if current_user.is_authenticated:
        return jsonify({"message": "Session active", "user_id": current_user.id}), 200
    else:
        return jsonify({"message": "Session not active"}), 401


@app.route('/')
def main():
    try:
        # Simulate fetching data from the database
        name = session.get('name', '')
        return jsonify({'name': name})
    except Exception as e:
        print(f"Error in main route: {e}")
        return jsonify({'error': 'Internal server error'}), 500
    
if __name__ == '__main__':
    app.run(debug=True)
