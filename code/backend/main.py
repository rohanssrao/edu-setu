import student_apis
import professor_api
import auth
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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

@app.route("/get_all_applications_by_student", methods=["POST"])
def get_all_applications_by_student():
    return student_apis.get_all_applications_by_student(request.get_json(force=True))

@app.route("/get_specific_application", methods=["GET"])
def get_specific_application():
    return student_apis.get_specific_application(request.get_json(force=True))

@app.route("/get_responses_for_application", methods=["POST"])
def get_responses_for_application():
    return professor_api.get_responses_for_application(request.get_json(force=True))

@app.route("/add_application", methods=["POST"])
def add_application():
    return student_apis.add_application(request.get_json(force=True))

@app.route("/add_posting", methods=["POST"])
def add_posting():
    return professor_api.add_posting(request.get_json(force=True))

@app.route("/get_all_postings_by_professor", methods=["POST"])
def get_all_postings_by_professor():
    return professor_api.get_all_postings_by_professor(request.get_json(force=True))

@app.route("/get_all_postings", methods=["GET"])
def get_all_postings():
    return professor_api.get_all_postings()

@app.route("/get_questions_by_posting", methods=["POST"])
def get_questions_by_posting():
    print(request.get_json(force=True))
    return professor_api.get_questions_by_posting(request.get_json(force=True))

@app.route("/update_posting", methods=["POST"])
def update_posting():
    return professor_api.update_posting(request.get_json(force=True))


@app.route("/delete_posting", methods=["POST"])
def delete_posting():
    return professor_api.delete_posting(request.get_json(force=True))


@app.route("/get_user_profile", methods = ["POST"])
def get_user_profile():
    return auth.get_user_profile(request.get_json(force=True))

@app.route("/update_application", methods=["POST"])
def update_application():
    return student_apis.update_application(request.get_json(force=True))

@app.route("/edit_profile", methods=["POST"])
def edit_profile():
    return auth.edit_profile(request.get_json(force=True))

@app.route("/get_applications_for_professor", methods=["POST"])
def get_applications_for_professor():
    return professor_api.get_applications_for_professor(request.get_json(force=True))

if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0')
