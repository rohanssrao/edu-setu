from urllib import response
from utils import *
import bcrypt


def get_all_users():
    con = connect()
    if not con:
        return prepare_response(False,  "Unable to connect to database.")
    try:
        curs = con.cursor()
    except Exception as e:
        print(e)
        return prepare_response(False,  "Unable to connect to database.")
    try:
        query = '''SELECT * FROM USERS'''
        curs.execute(query)
        curs.rowfactory = makeDictFactory(curs)
        response = curs.fetchall()
        try:
            con.close()
        except:
            pass
        return prepare_response(True, response)
    except Exception as e:
        print(e)
        return {"status": False, "data": str(e)}
    finally:
        try:
            con.close()
        except:
            pass

def register(data):
    try:
        con = connect()
    except:
        return prepare_response(False, "Unable to create DB connection")
    try:
        # Get the data from JSON Payload
        email = data["email"]
        password = bcrypt.hashpw(data["password"].encode("utf-8"), bcrypt.gensalt())
        user_type = data["type"]

        # Check if email id is already present.
        cur = con.cursor()
        query = "SELECT email FROM USERS WHERE EMAIL = :1"
        params = [email]
        res = cur.execute(query, params)
        rows = res.fetchall()
        if len(rows):
            return prepare_response(
                False, f"User with email {email} already exists."
            )

        # If it is a new user, insert the details into the database.
        query = "INSERT INTO USERS (EMAIL, DISPLAY_NAME, PASSWORD) VALUES (:1,:2,:3)"
        params = [email, user_type, password]
        cur.execute(query, params)
        con.commit()
        return prepare_response(
            True, f"User Registration Successful."
        )
    except Exception as e:
        print(e)
        return prepare_response(False, str(e))
    finally:
        disconnect(con)