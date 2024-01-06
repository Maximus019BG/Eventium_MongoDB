import os
from flask import Flask, jsonify, request, make_response, session
from flask_cors import CORS
from flask_login import LoginManager, UserMixin, login_user, login_required, current_user, logout_user
from pymongo import MongoClient
from user.models import User  # Assuming you have a User model
from datetime import timedelta

app = Flask(__name__)
CORS(app)

app.secret_key = os.environ.get("FLASK_SECRET_KEY", "your_default_secret_key")
app.permanent_session_lifetime = timedelta(days=5)

# Load MongoDB credentials from environment variables
password = os.environ.get("MONGODB_PWD")
connection_string = f"mongodb+srv://maxralev:{password}@cluster1.hn9gicg.mongodb.net/?retryWrites=true&w=majority&ssl=true&tlsAllowInvalidCertificates=true"
client = MongoClient(connection_string)
db = client["your_database_name"]  # Replace with your actual database name
users_collection = db["users"]  # Replace with your actual collection name

# Initialize Flask-Login
login_manager = LoginManager(app)
login_manager.login_view = "login"


@login_manager.user_loader
def load_user(user_id):
    user_data = users_collection.find_one({"_id": user_id})
    if user_data:
        return User(user_data["_id"], user_data["username"])  # Adjust accordingly


# main api page
@app.route('/', methods=['GET'])
def main():
    name = "Maks"
    return {'name': name}


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user_data = users_collection.find_one({"username": username, "password": password})

    if user_data:
        user = User(user_data["_id"], user_data["username"])  # Adjust accordingly
        session["user_id"] = str(user.id)
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
    if "user_id" in session:
        return jsonify({"message": "Session active", "user_id": session["user_id"]}), 200
    else:
        return jsonify({"message": "Session not active"}), 401


if __name__ == '__main__':
    app.run(debug=True)
