from pymongo import MongoClient
from pymongo.encryption import ClientEncryption
from pymongo.encryption_options import AutoEncryptionOpts
from dotenv import load_dotenv
import os
from flask import Flask

app = Flask(__name__)
load_dotenv()

class User:
    def __init__(self):
        password = os.environ.get("MONGODB_PWD")
        connection_string = f"mongodb+srv://maxralev:{password}@cluster1.hn9gicg.mongodb.net/EventiumDatabase?retryWrites=true&w=majority&ssl=true&tlsAllowInvalidCertificates=true"
        self.client = MongoClient(connection_string)

        # Ensure the key is generated securely
        key_bytes = os.urandom(96)

        # Create AutoEncryptionOpts to be used by ClientEncryption
        auto_encryption_opts = AutoEncryptionOpts(
            kms_providers={'local': {'key': key_bytes}},
            key_vault_namespace='encryption.__keyVault',
            key_vault_client=self.client,
        )

        # Initialize the ClientEncryption object
        key_vault_client = self.client.get_database('encryption').get_collection('__keyVault')
        self.client_encryption = ClientEncryption(
            key_vault_client,
            auto_encryption_opts=auto_encryption_opts,
        )



    def signup(self, name, email, password):
        encrypted_password = self.client_encryption.encrypt(password)
        user_data = {
            "name": name,
            "email": email,
            "password": encrypted_password,
        }

        result = self.users_collection.insert_one(user_data)
        user_id = result.inserted_id

        user = {
            "_id": str(user_id),
            "name": name,
            "email": email,
            "password": encrypted_password,
        }
        return user

    def get_user_by_email(self, email):
        user_data = self.users_collection.find_one({'email': email})
        return user_data

    def decrypt_password(self, encrypted_password):
        decrypted_password = self.client_encryption.decrypt(encrypted_password)
        return decrypted_password
