import student_apis
from flask import Flask, request

app = Flask(__name__)


@app.route("/")
def index():
    return "You have reached the backend application. Change port to 3000 to navigate to the UI."

# Student APIs


@app.route("/get_all_users", methods=["GET"])
def get_all_users():
    return student_apis.get_all_users()

@app.route("/register", methods=["POST"])
def register():
    return student_apis.register(request.get_json(force=True))

@app.route("/login", methods=["POST"])
def login():
    return student_apis.login(request.get_json(force=True))

app.run(debug=True,host='0.0.0.0')
