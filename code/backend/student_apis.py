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
        display_name = data["display_name"]
        phone = data["phone"]

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
        query = "INSERT INTO USERS (EMAIL, DISPLAY_NAME, PASSWORD, TYPE, PHONE) VALUES (:1,:2,:3,:4,:5)"
        params = [email, display_name, password, user_type, phone]
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


def login(data):
    try:
        con = connect()
    except:
        return prepare_response(False, "Unable to create DB connection")
    try:
        # Get the data from JSON Payload
        email = data["email"]
        password = data["password"]

        # Check if user exists
        cur = con.cursor()
        query = "SELECT display_name,email, password FROM USERS WHERE EMAIL = :1"
        params = [email]
        cur.execute(query, params)
        cur.rowfactory = makeDictFactory(cur)
        row = cur.fetchone()
        print(row)
        if row is None:
            return prepare_response(
                False, f"User with email {email} doesn't exist. Please register first."
            )
        valid = bcrypt.checkpw(password.encode("utf-8"), row["password"].encode("utf-8"))
        if valid:
            return prepare_response(
                True, {"email": row["email"], "display_name": row["display_name"]}
            )
        else:
            return prepare_response(False, "Invalid Credentials.")
    except Exception as e:
        print(e)
        return prepare_response(False, str(e))
    finally:
        disconnect(con)