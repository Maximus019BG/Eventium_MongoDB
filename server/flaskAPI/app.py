from flask import Flask
from dotenv import load_dotenv, find_dotenv
import os
from flask import Flask, jsonify, request
from flask_login import LoginManager, UserMixin, login_user, login_required, current_user, logout_user
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.secret_key = 'your_secret_key'  # Change this to a secure secret key
login_manager = LoginManager(app)

# Dummy user for demonstration purposes
class User(UserMixin):
    def __init__(self, id):
        self.id = id

@login_manager.user_loader
def load_user(user_id):
    return User(user_id)


@app.route('/', methods=['GET'])
def main():
    return({
        'userId': 1,
        'username': "USer1",
        'message': "Welcome",

    })


@app.route('/login', methods=['POST'])
def login():
    user_id = request.form.get('user_id')
    user = User(user_id)
    login_user(user)
    return jsonify(message="Login successful")

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify(message="Logout successful")

@app.route('/api/protected')
@login_required
def protected():
    return jsonify(message="This is a protected route")

if __name__ == '__main__':
    app.run(debug=True)


# load_dotenv(find_dotenv())

# password = os.environ.get("MONGODB_PWD")

# # MongoDB connection string with SSL
# connection_string = f"mongodb+srv://maxralev:{password}@cluster1.hn9gicg.mongodb.net/?retryWrites=true&w=majority&ssl=true&tlsAllowInvalidCertificates=true"
# client = MongoClient(connection_string)

# # List the available databases
# dbs = client.list_database_names()
# EventiumDatabase_db= client.EventiumDatabase
# collections = EventiumDatabase_db.list_collection_names()


# def insert_test_doc():
#     collection = EventiumDatabase_db.Users
#     EventiumDatabase_documents = {
#             "name": "Max",
#             "type": "test"

#     }
#     inserted_id = collection.insert_one(EventiumDatabase_documents).inserted_id
#     print(inserted_id)

# Eventium = client.EventiumDatabase
# EventiumDatabase_collection = Eventium.Users

# def create_documents ():
#     first_names = ["Tim", "Sarah", "Jennifer", "Jose", "Brad", "Allen"]
#     last_names =["Ruscica", "Smith", "Bart", "Cater", "Pit", "Geral", ]
#     ages = [21, 40, 23, 19, 34, 67]

#     docs=[]

#     for first_name,last_name, age in zip(first_names,last_names, ages):
#         doc = {"first_name": first_name, "last_name" : last_name, "age": age}
#         docs.append(doc)

#     EventiumDatabase_collection.insert_many(docs)





