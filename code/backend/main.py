import student_apis
import auth
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
    return auth.register(request.get_json(force=True))


@app.route("/login", methods=["POST"])
def login():
    return auth.login(request.get_json(force=True))

@app.route("/get_all_application", methods=["GET"])
def get_all_application():
    return student_apis.get_all_application()

@app.route("/get_all_applications_by_student", methods=["GET"])
def get_all_applications_by_student():
    return student_apis.get_all_applications_by_student(request.get_json(force=True))

@app.route("/get_specific_application", methods=["GET"])
def get_specific_application():
    return student_apis.get_specific_applicationt(request.get_json(force=True))



app.run(debug=True,host='0.0.0.0')
