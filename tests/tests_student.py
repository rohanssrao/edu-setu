import sys
import traceback

sys.path.append("../code/backend")

import auth, student_apis, utils

def test_register():

    data = {
  "email":"Yash@ncsu.edu",
  "password": "iamyash",
  "type":"student",
  "display_name": "Yash",
  "phone": "9824898248",
  "gpa": 4.0,
  "major":"CS",
  "degree":"masters",
  "year":"Junior",
  "minor": "None"
    }

    answer = auth.register(data)
    print(answer)


test_register()
