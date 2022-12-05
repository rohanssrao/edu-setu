from flask import Flask, request, Response, abort
from load_json_to_db import save_json_to_db, delete_from_db, update_user_data
from models import db, UserLogin
from user_data import AllUserData
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask import Blueprint
from main import jwt
resume_api = Blueprint('resume_api',__name__)



@resume_api.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@resume_api.route("/api/get", methods=['GET'])
@jwt_required()
def get_user_data():
    user_id = get_jwt_identity()
    all_user_data = AllUserData(user_id)
    all_user_data.get_data_of_user()
    return list(all_user_data)


@resume_api.route('/api/submit', methods=['POST'])
@jwt_required()
def create():
    user_id = get_jwt_identity()
    request_data = request.get_json()
    data = request_data[1]
    is_sucess = save_json_to_db(user_id, data, db)
    return Response("{'a':'b'}", status=201, mimetype='application/json') if is_sucess else Response("{'a':'b'}", status=406, mimetype='application/json')


@resume_api.route('/api/delete', methods=['POST'])
@jwt_required()
def delete_entry_from_db():
    user_id = get_jwt_identity()
    request_data = request.get_json()
    data_id = request_data['data_id']
    data_type = request_data['type']
    is_sucess = delete_from_db(user_id, data_id, data_type, db)
    #accept or not_accept
    return Response("{'a':'b'}", status=201, mimetype='application/json') if is_sucess else Response("{'a':'b'}", status=406, mimetype='application/json')


@resume_api.route('/api/register', methods=['POST'])
def new_user():
    '''
    new user registration
    '''
    email = request.json.get('email')
    username = request.json.get('username',email)
    password = request.json.get('password')
    if username is None or password is None or email is None:
        abort(400)  # missing arguments
    if UserLogin.query.filter_by(email=email).first() is not None:
        abort(400)  # existing user
    user = UserLogin(username=username, email=email)
    user.hash_password(password)
    try:
        db.session.add(user)
        db.session.commit()
        access_token = create_access_token(identity=user.id)
        return {'response':'user created', 'status':201, 'access_token':access_token}
    except:
        db.session.rollback()
        return {'response':'email already taken', 'status':400}


def verify_password(email, password):
    # first try to authenticate by token
    user = None
    if not user:
        # try to authenticate with username/password
        user = UserLogin.query.filter_by(email=email).first()
        if not user or not user.verify_password(password):
            return False
    return user


@resume_api.route('/api/login', methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = verify_password(email, password)
    if not user:
        abort(400)
    access_token = create_access_token(identity=user.id)
    return {"access_token": access_token}

# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.


@resume_api.route("/api/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return {"logged_in_as": current_user}, 200
