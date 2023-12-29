from flask import Flask, jsonify

class User:
    def signup(self):
        user = {
            "_id": "",
            "name": "",
            "email": "",
            "password": "",
        }
        return user