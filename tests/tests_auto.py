from main import app
import auth
import student_apis
import utils
import string
import sys
import traceback
from flask import Flask
import json
import pytest

sys.path.append("../code/backend")

base_url = "http://127.0.0.1:5000"


def test_index_route():
    response = app.test_client().get(f'{base_url}/')
    assert response.status_code == 200
