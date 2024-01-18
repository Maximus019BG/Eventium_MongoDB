# Eventium

**Eventium** is a web application designed for sharing information about events.

## Introduction

Eventium provides a platform for users to share and discover events. This README serves as a guide to set up and understand the project.

## Flask

The server side of the application is written in Python using the Flask library.

### Flask Setup

To set up the Flask server, follow these steps:

1. Install dependencies: `pip install -r requirements.txt`
2. Run the server: `python app.py`

Example code:

```python
from flask import Flask

app = Flask(__name__)

@app.route('/', methods=['GET'])
def main():
   # code ...

if __name__ == '__main__':
    app.run(debug=True)
```
## Database
For database we used **MongoDB**.

1. Create a .env file with you password to the database
2. Link it to the python code `connection_link = f"mongoDB://link..."`

### MongoDB setup
```python
from dotenv import load_dotenv, find_dotenv
from pymongo import MongoClient

# code ...

connection_link = f"mongoDB://link..."
client = MongoClient(connection_link)

# code ...
```

We have a password *hash* so your data is secure in our ***database.***