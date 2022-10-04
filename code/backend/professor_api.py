from os import posix_fallocate
from utils import *
import bcrypt

def add_posting(data):
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
        query = "INSERT INTO POSTINGS ( TITLE, PROFESSOR, DESCRIPTION, LOCATION) VALUES (:1,:2,:3,:4)"
        params = [title, professor, description, location]
        cur.execute(query, params)
        con.commit()
        return prepare_response(
            True, f"posting added."
        )
    except Exception as e:
        print(e)
        return prepare_response(False, str(e))
    finally:
        disconnect(con)
        
    

def get_all_postings_by_professor(data):
    con = connect()
    if not con:
        return prepare_response(False,  "Unable to connect to database.")
    try:
        curs = con.cursor()
    except Exception as e:
        print(e)
        return prepare_response(False,  "Unable to connect to database.")
    try:
        professor = data["prof"]
        query = '''SELECT * FROM POSTINGS WHERE PROFESSOR = :1'''
        params = [professor]
        curs.execute(query, params)
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




def get_all_postings():
    con = connect()
    if not con:
        return prepare_response(False,  "Unable to connect to database.")
    try:
        curs = con.cursor()
    except Exception as e:
        print(e)
        return prepare_response(False,  "Unable to connect to database.")
    try:
        query = '''SELECT * FROM POSTINGS'''
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
