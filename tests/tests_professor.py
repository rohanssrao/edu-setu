import sys
import traceback
import utils

sys.path.append("../code/backend")
import professor_api 

def test_get_all_postings_by_professor():
    data = { "professor:1010" }
    x = get_all_postings_by_professor(data)
    if x :
        return True
    else:
        False
    
    