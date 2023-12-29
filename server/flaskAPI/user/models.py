from flask import Flask, jsonify
from pymongo import MongoClient
import os

class User:
    def signup(self, name, email, password):
        user_data = {
            "name": name,
            "email": email,
            "password": password,
        }

        # Connect to MongoDB
        password = os.environ.get("MONGODB_PWD")
        connection_string = f"mongodb+srv://maxralev:{password}@cluster1.hn9gicg.mongodb.net/EventiumDatabase?retryWrites=true&w=majority&ssl=true&tlsAllowInvalidCertificates=true"
        client = MongoClient(connection_string)

        # Choose the database and collection
        db = client['EventiumDatabase']
        users_collection = db['Users']

        # Insert user data into the collection
        result = users_collection.insert_one(user_data)

        # Retrieve the inserted user's ID
        user_id = result.inserted_id

        # Return the user data with the generated ID
        user = {
            "_id": str(user_id),
            "name": name,
            "email": email,
            "password": password,
        }
        return user
