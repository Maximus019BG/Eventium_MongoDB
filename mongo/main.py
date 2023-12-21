from dotenv import load_dotenv, find_dotenv
import os
from pymongo import MongoClient

load_dotenv(find_dotenv())

password = os.environ.get("MONGODB_PWD")

# MongoDB connection string with SSL
connection_string = f"mongodb+srv://maxralev:{password}@cluster1.hn9gicg.mongodb.net/?retryWrites=true&w=majority&ssl=true&tlsAllowInvalidCertificates=true"
client = MongoClient(connection_string)

# List the available databases
dbs = client.list_database_names()
EventiumDatabase_db= client.EventiumDatabase
collections = EventiumDatabase_db.list_collection_names()


def insert_test_doc():
    collection = EventiumDatabase_db.Users
    EventiumDatabase_documents = {
            "name": "Max",
            "type": "test"

    }
    inserted_id = collection.insert_one(EventiumDatabase_documents).inserted_id
    print(inserted_id)

Eventium = client.EventiumDatabase
EventiumDatabase_collection = Eventium.Users

def create_documents ():
    first_names = ["Tim", "Sarah", "Jennifer", "Jose", "Brad", "Allen"]
    last_names =["Ruscica", "Smith", "Bart", "Cater", "Pit", "Geral", ]
    ages = [21, 40, 23, 19, 34, 67]

    docs=[]

    for first_name,last_name, age in zip(first_names,last_names, ages):
        doc = {"first_name": first_name, "last_name" : last_name, "age": age}
        docs.append(doc)

    EventiumDatabase_collection.insert_many(docs)

create_documents()



