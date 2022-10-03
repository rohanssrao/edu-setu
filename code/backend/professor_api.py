from os import posix_fallocate
from utils import *
import bcrypt

def add_positing(data):
    try:
        con = connect()
    except:
        return prepare_response(False, "Unable to create DB connection")
    try:
        # Get the data from JSON Payload
        professor = data["email"]
        title = data["designation"]
        description = data["notes"]
        location = data["area"]
        # Insert application into database
        cur = con.cursor()
        query = "INSERT INTO POSTINGS ( TITLE, PROFESSOR, DESCRIPTION , LOCATION) VALUES (:1,:2,:3,:4)"
        params = [title, professor, description, location]
        cur.execute(query, params)
        con.commit()
        return prepare_response(
            True, f"Application added."
        )
    except Exception as e:
        print(e)
        return prepare_response(False, str(e))
    finally:
        disconnect(con)