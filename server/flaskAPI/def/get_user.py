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



def get_name_from_mongodb(database_name, collection_name, name_to_search):
    # Connect to MongoDB
    
    password = os.environ.get("MONGODB_PWD")
    connection_string = f"mongodb+srv://maxralev:{password}@cluster1.hn9gicg.mongodb.net/?retryWrites=true&w=majority&ssl=true&tlsAllowInvalidCertificates=true"
    client = MongoClient(connection_string)

    # Select the database and collection
    db = client[database_name]
    collection = db[collection_name]

    # Search for a document with the specified name
    query = {"name": name_to_search}
    result = collection.find_one(query)

    # Close the MongoDB connection
    client.close()

    return result



mongo_client = None

def initialize_mongo_client(mongo_uri):
    global mongo_client
    mongo_client = MongoClient(mongo_uri)

def get_document_by_field(database_name, collection_name, field_name, field_value):
    # Select the database and collection
    db = mongo_client[database_name]
    collection = db[collection_name]

    # Search for a document with the specified field and value
    query = {field_name: field_value}
    result = collection.find_one(query)

    return result

def close_mongo_client():
    global mongo_client
    if mongo_client:
        mongo_client.close()
        print("MongoDB client closed.")
    else:
        print("MongoDB client was not initialized.")