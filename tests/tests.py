import string
import sys
import traceback
from flask import Flask
import json
import pytest

sys.path.append("../code/backend")
import utils
import student_apis
import auth
from main import app

# Base URL for API requests
base_url = "http://127.0.0.1:5000"
    
def test_login():
    request = { "email":"professor@ncsu.edu", "password": "12345678"}
    request = json.dumps(request)
    response = app.test_client().post(f'{base_url}/login', data=request)

    assert response.status_code ==200
    json_response = json.loads(response.data.decode("utf-8"))

    assert json_response['status'] == True
    assert type(json_response['data']) is dict


def test_register():
    request = { "email":"professor@ncsu.edu","password": "12345678","type":"student","display_name": "Test1","phone": "000000000" }
    request = json.dumps(request)
    response = app.test_client().post(f'{base_url}/register', data=request)

    assert response.status_code ==200
    json_response = json.loads(response.data.decode("utf-8"))

    assert type(json_response['data']) is str


def test_get_user_profile():
    request = {"user_id" : 25}
    request = json.dumps(request)
    response = app.test_client().post(f'{base_url}/get_user_profile', data=request)

    assert response.status_code ==200
    json_response = json.loads(response.data.decode("utf-8"))
    print(json_response)
    assert json_response['status'] == True
    assert type(json_response['data']) is dict


def test_get_all_applications():
    response = app.test_client().get(f'{base_url}/get_all_application')
    assert response.status_code ==200
    json_response = json.loads(response.data.decode("utf-8"))
    assert json_response['status'] == True
    assert type(json_response['data']) is list

def test_get_all_users():
    response = app.test_client().get(f'{base_url}/get_all_users')
    assert response.status_code ==200
    json_response = json.loads(response.data.decode("utf-8"))
    assert json_response['status'] == True
    assert type(json_response['data']) is list

def test_get_specific_applications():
    request = {"application" : 1}
    request = json.dumps(request)
    response = app.test_client().get(f'{base_url}/get_specific_application', data=request)
    assert response.status_code ==200
    json_response = json.loads(response.data.decode("utf-8"))
    assert json_response['status'] == True
    assert type(json_response['data']) is dict


def test_get_application_by_professor():
    request = { "professor":1033}
    request = json.dumps(request)
    response = app.test_client().post(f'{base_url}/get_applications_for_professor', data=request)

    assert response.status_code ==200
    json_response = json.loads(response.data.decode("utf-8"))

    assert json_response['status'] == True
    assert type(json_response['data']) is list


def test_update_application():
    request = {"application_id": 1048,"status": "Withdrawn","remarks": "Updated"}
    request = json.dumps(request)
    response = app.test_client().post(f'{base_url}/update_application', data=request)

    assert response.status_code ==200
    json_response = json.loads(response.data.decode("utf-8"))

    assert json_response['status'] == True
    assert type(json_response['data']) is str


def get_all_application_by_student():
    request = {"user_id" : 1032}
    request = json.dumps(request)
    response = app.test_client().post(f'{base_url}/get_all_applications_by_student', data=request)

    assert response.status_code ==200
    json_response = json.loads(response.data.decode("utf-8"))

    assert json_response['status'] == True
    assert type(json_response['data']) is list


def test_index_route():
    response = app.test_client().get(f'{base_url}/')
    assert response.status_code == 200
    
def test_get_all_postings():
    response = app.test_client().get(f'{base_url}/get_all_postings')
    assert response.status_code ==200
    json_response = json.loads(response.data.decode("utf-8"))
    assert json_response['status'] == True
    assert type(json_response['data']) is list

def test_get_all_postings_by_professor():
    request = { "professor":1010 }
    request = json.dumps(request)
    response = app.test_client().post(f'{base_url}/get_all_postings_by_professor', data=request)

    assert response.status_code ==200
    json_response = json.loads(response.data.decode("utf-8"))

    assert json_response['status'] == True
    assert type(json_response['data']) is list
    
    
def test_update_posting():
    request = { "posting_id":1046, "professor": 1033 , "title":"Frontend Testing", "description":"Test UI", "location":"Suspense II", "prerequisites":"ANTD"}
    request = json.dumps(request)
    response = app.test_client().post(f'{base_url}/update_posting', data=request)

    assert response.status_code ==200
    json_response = json.loads(response.data.decode("utf-8"))

    assert json_response['status'] == True
    assert type(json_response['data']) is str
    
    
def test_get_applications_for_professor():
    request = {"professor": 1010}
    request = json.dumps(request)
    response = app.test_client().post(f'{base_url}/get_applications_for_professor', data=request)

    assert response.status_code ==200
    json_response = json.loads(response.data.decode("utf-8"))

    assert json_response['status'] == True
    assert type(json_response['data']) is list
    
def test_edit_profile():
    request = {"email":"yashasya@ncsu.edu","user_id":1029,"type":"student","display_name": "Yashasya","phone": 9996663330,"gpa":3.5,"major":"CS","minor":"None","degree":"Graduate","year":"postdoc"}
    request = json.dumps(request)
    response = app.test_client().post(f'{base_url}/edit_profile', data=request)

    assert response.status_code ==200
    json_response = json.loads(response.data.decode("utf-8"))

    assert type(json_response['data']) is str





