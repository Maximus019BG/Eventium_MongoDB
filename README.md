# Eventium

**Eventium**  is a web application for sharing information about *_events_*.

## Flask
The server side of the application is written in **Python** with *Flask* library. 

### Flask setup
```
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

### MongoDB setup
```
from dotenv import load_dotenv, find_dotenv

# code ...

connection_link = f"mongoDB://link..."
client = MongoClient(connection_link)

# code ...
```