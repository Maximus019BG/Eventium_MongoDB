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
    ...

if __name__ == '__main__':
    app.run(debug=True)
```
## Database
For database we used **MongoDB**.

### MongoDB setup
```
from dotenv import load_dotenv, find_dotenv

...

password = os.environ.get("EXAMPLE_PASSWORD")
connection_string = f"mon://...:{password}@..."
client = MongoClient(connection_string)

...
```