import sys
import traceback


sys.path.append("../code/backend")
import utils
import professor_api 

def test_get_all_postings_by_professor():
    data = { "professor:1010" }
    x = professor_api.get_all_postings_by_professor(data)
    print(x)
    if x :
        print('True')
    else:
        print('False')
    
test_get_all_postings_by_professor()
