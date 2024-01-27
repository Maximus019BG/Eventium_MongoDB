import os
import random
import requests
import base64
from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from passlib.hash import bcrypt
from pymongo import MongoClient
from datetime import timedelta
from user.models import User
from user.routes import user_bp
from flask_session import Session
from werkzeug.utils import secure_filename
from gridfs import GridFS
from werkzeug.datastructures import FileStorage
from bson import ObjectId
from datetime import date, datetime
from func.functions import is_event_past, delete_expired_posts
from flask_caching import Cache
from secrets import token_hex
from flask_login import login_user
from flask import session
from flask_login import LoginManager
from flask_login import UserMixin
from flask import Flask, jsonify, request, session
from flask_login import LoginManager, UserMixin, login_user
from flask_bcrypt import Bcrypt
from bson.objectid import ObjectId
from pymongo import MongoClient

app = Flask(__name__)
app.config['SESSION_TYPE'] = 'filesystem'
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=7) 
app.config['SESSION_COOKIE_NAME'] = 'eventium_session'
app.config['SESSION_FILE_DIR'] = 'D:\\Eventium\\flask_session'
app.config['SESSION_COOKIE_SAMESITE'] = None  
app.config.from_object(__name__)
app.config['SESSION_COOKIE_SECURE'] = True
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SECRET_KEY'] = 'your secret key'

Session(app)



bcrypt = Bcrypt(app)
 
cache = Cache(app, config={'CACHE_TYPE': 'simple'})


CORS(app, supports_credentials=True)

app.register_blueprint(user_bp)  
# session
app.secret_key = 'your secret key'

# Flask-Login

login_manager = LoginManager(app)

login_manager.login_view = "login"
login_manager.login_message = "Please log in to access this page."
login_manager.session_protection = "strong"

# MongoDB 
password = os.environ.get("MONGODB_PWD")
connection_string = f"mongodb+srv://maxralev:{password}@cluster1.hn9gicg.mongodb.net/?retryWrites=true&w=majority&ssl=true&tlsAllowInvalidCertificates=true"
client = MongoClient(connection_string)
db = client["EventiumDatabase"]  
users_collection = db["Users"] 
posts_collection = db["Posts"]
grid_fs = GridFS(db)
api = os.environ.get("API")

class User(UserMixin):
    def __init__(self, id, name, email):
        self.id = id
        self.name = name
        self.email = email
               

@login_manager.user_loader
def load_user(user_id):
    user_data = users_collection.find_one({"_id": ObjectId(user_id)})
    if user_data:
        return User(str(user_data["_id"]), user_data["name"], user_data["email"])
    return None

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify({'message': 'No input data provided'}), 400
    name = data.get('username')
    password = data.get('password')

    user_data = users_collection.find_one({"name": name})
    authentication_successful = user_data and bcrypt.check_password_hash(user_data.get("password"), password)
  
    if authentication_successful:
        user = User(str(user_data["_id"]), user_data["name"],user_data["email"])
        session['name'] = user.name
        session['user_id'] = str(user.id)
        session.modified = True
        session.permanent = True
        login_user(user, remember=True)        
        response = make_response(jsonify({"message": "Login successful"}), 200)
        response.set_cookie('name', session['name'])
        
        response2 = requests.post(f'{api}/check_session', json={"name": session['name']})
        print(response2.text)  # print the response from /check_session
        return response,200
    else:
        return jsonify({"message": "Invalid credentials"}), 401
 
@app.route("/check_session", methods=["GET", "POST"])
def check_session():
    if request.method == "POST":
        data = request.get_json()
        if data and 'name' in data:
            session['name'] = data['name']
            response = requests.post(f'{api}/', json={"name": session['name']})
            if current_user:
                session_info = {
                "Session Data": dict(session),
                 }

                # Check if 'user_id' is in the session
                if 'name' in session:
                    session_info["Session User "] = session.get('name')
                else:
                    session_info["No user_id in session."] = True
                print (f"Name {session.get('name')}")
                return jsonify(session_info), 200
    
    name = session.get('name')
   
    if request.method == "GET":
        if name:
            print (name)
            return jsonify({"message": "User is logged in"}), 200
        else:
            return jsonify({"message": "User is not logged in"}), 401
        
    else:
        return jsonify({"message": "User not authenticated"}), 401

   


#fix not json format
def convert_objectid_to_str(data):
    if isinstance(data, dict):
        for key, value in data.items():
            if isinstance(value, (dict, list)):
                data[key] = convert_objectid_to_str(value)
            elif isinstance(value, ObjectId):
                data[key] = str(value)
    elif isinstance(data, list):
        for i, item in enumerate(data):
            data[i] = convert_objectid_to_str(item)
    return data


@app.route('/', methods=['GET','POST'])
@cache.cached(timeout=20)
def main():
    try:
        data = request.get_json()
        name = data.get('name') if data else None


        delete_expired_posts(posts_collection)
        cursor = posts_collection.find()          # Find documents in the collection
        documents_list_normal = list(cursor)      # Convert the cursor to a list of documents
        random.shuffle(documents_list_normal)     # Shuffle 
        for i, document in enumerate(documents_list_normal):
            documents_list_normal[i] = convert_objectid_to_str(document)

            # Fetch the image data GridFS
            image_id = document.get("photos")
            image = grid_fs.get(ObjectId(image_id))

            if image:
                # Convert bytes to encoded string
                document["image_data"] = base64.b64encode(image.read()).decode('utf-8')

        # Extract title... fields from each document
        formatted_documents_list = [
            {
                "title": doc.get("title", ""),
                "description": doc.get("description", ""),
                "photos": doc.get("photos", ""),
                "image_data": doc.get("image_data", "")
            }
            for doc in documents_list_normal
        ]
       

        # After the loop
        return jsonify({'documents': convert_objectid_to_str(formatted_documents_list), 'name': name}), 200


    except Exception as e:
        print(f"Error in main route: {e}")
        return jsonify({'error': 'Internal server error'}), 500



@app.route('/posts', methods=["POST"])
def posts():
    try:
       
        title = request.form.get('title')
        description = request.form.get('description')
        photos = request.files.get('photos')
        date_of_creation = str(date.today())         #saving the date as string    
        date_of_event = request.form.get('date')

        if title and description and photos:
            # Save the file to GridFS
            file_id = save_file_to_gridfs(photos)

            
            post_data = {
                "title": title,
                "description": description,
                "photos": file_id,
                "created_at": date_of_creation,
                "date_for_event":date_of_event,
            }

            # Insert the post into the MongoDB
            _ = posts_collection.insert_one(post_data)

           

            return jsonify({"message": "Post created successfully"}), 200
        
        else:
            return jsonify({"error": "Missing required parameters"}), 400   

    except Exception as e:
        print(f"Error in /posts route: {e}")
        return jsonify({"error": "Internal server error"}), 500



def save_file_to_gridfs(file: FileStorage):
    # Save in GridFS and return file_id
    file_id = grid_fs.put(file, filename=secure_filename(file.filename))
    return file_id



if __name__ == '__main__':
    app.run(debug=True)