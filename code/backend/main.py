from distutils.log import debug
from flask import Flask

app = Flask(__name__)

@app.route("/")

def index():
    db_name = 'EduSetuDB.db'
    
    return 

app.run(debug=True)
