from dotenv import load_dotenv, find_dotenv
import os
from flask import Flask, jsonify, request
from flask_login import LoginManager, UserMixin, login_user, login_required, current_user, logout_user
from flask_cors import CORS
from user.routes import user_bp  # Import user_bp directly
from pymongo import MongoClient
from user.models import User  # Import the User class

app = Flask(__name__)
CORS(app)

password = os.environ.get("MONGODB_PWD")
connection_string = f"mongodb+srv://maxralev:{password}@cluster1.hn9gicg.mongodb.net/?retryWrites=true&w=majority&ssl=true&tlsAllowInvalidCertificates=true"
client = MongoClient(connection_string)

# Register the user_bp blueprint
app.register_blueprint(user_bp)

@app.route('/', methods=['GET'])
def main():
    return {
        'userId': 1,
        'username': "User1",
        'message': "ZDR Emo",
    }

@app.route('/api/protected')
def protected():
    return jsonify(message="This is a protected route")



if __name__ == '__main__':
    app.run(debug=True)


# load_dotenv(find_dotenv())



# # MongoDB connection string with SSL


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




