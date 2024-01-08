from pymongo import MongoClient
from dotenv import load_dotenv
import os
from flask import Flask
from passlib.hash import bcrypt

app = Flask(__name__)
load_dotenv()

class User:
    def __init__(self):
        password_mdb = os.environ.get("MONGODB_PWD")
        connection_string = f"mongodb+srv://maxralev:{password_mdb}@cluster1.hn9gicg.mongodb.net/EventiumDatabase?retryWrites=true&w=majority&ssl=true&tlsAllowInvalidCertificates=true"
        self.client = MongoClient(connection_string)
        self.db = self.client['EventiumDatabase']
        self.users_collection = self.db['Users']

    def signup(self, name, email, password):
        # Hash the password using bcrypt
        hashed_password = bcrypt.hash(password)
        
        #under development
        user = self.users_collection.find_one({"name": name, "email": email})
        if user:
            
            # Prepare user data
            user_data = {
                "name": name,
                "email": email,
                "password": hashed_password,
             }

            # Insert user data into the collection
            result = self.users_collection.insert_one(user_data)

            # Retrieve the inserted user's ID
            user_id = result.inserted_id

            user = {
                "_id": str(user_id),
                "name": name,
                "email": email,
                "password": hashed_password,
            }
            message = None
            return user, message
        
        else:
            message = "Вече има акаунт с такова име или емейл "

            return message

            
        

       
   



