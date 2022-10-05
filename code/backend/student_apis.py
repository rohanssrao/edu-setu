from os import posix_fallocate
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


# def get_all_application():
#     con = connect()
#     if not con:
#         return prepare_response(False,  "Unable to connect to database.")
#     try:
#         curs = con.cursor()
#     except Exception as e:
#         print(e)
#         return prepare_response(False,  "Unable to connect to database.")
#     try:
#         query = '''SELECT * FROM APPLICATIONS'''
#         curs.execute(query)
#         curs.rowfactory = makeDictFactory(curs)
#         response = curs.fetchall()
#         data_app = response
#         posting_id = data_app["POSTING_ID"]
#         created_at = data_app["CREATED_AT"]
#         updated_at = data_app["UPDATED_AT"]


        


#         try:
#             con.close()
#         except:
#             pass
#         return prepare_response(True, response)
#     except Exception as e:
#         print(e)
#         return {"status": False, "data": str(e)}
#     finally:
#         try:
#             con.close()
#         except:
#             pass


def get_all_applications_by_student(data):
    con = connect()
    if not con:
        return prepare_response(False,  "Unable to connect to database.")
    try:
        curs = con.cursor()
    except Exception as e:
        print(e)
        return prepare_response(False,  "Unable to connect to database.")
    try:
        student = data["student"]
        query = '''SELECT * FROM APPLICATIONS WHERE STUDENT = :1'''
        params = [student]
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


def get_specific_application(data):
    con = connect()
    if not con:
        return prepare_response(False,  "Unable to connect to database.")
    try:
        curs = con.cursor()
    except Exception as e:
        print(e)
        return prepare_response(False,  "Unable to connect to database.")
    try:
        application = data["application"]
        query = '''SELECT * FROM APPLICATIONS WHERE APPLICATION_ID = :1'''
        params = [application]
        curs.execute(query, params)
        curs.rowfactory = makeDictFactory(curs)
        response = curs.fetchone()
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


def add_application(data):
    try:
        con = connect()
    except:
        return prepare_response(False, "Unable to create DB connection")
    try:
        # Get the data from JSON Payload
        student = data["user_id"]
        status = "pending"
        Posting_id = data["posting_id"]
        remarks = ""
        # Insert application into database
        cur = con.cursor()
        query = "INSERT INTO APPLICATIONS (STUDENT, STATUS, POSTING_ID, REMARKS, CREATED_AT, UPDATED_AT) VALUES (:1,:2,:3,:4,SYSTIMESTAMP,SYSTIMESTAMP)"
        params = [student,status,Posting_id,remarks]
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


def get_all_application():
    con = connect()
    if not con:
        return prepare_response(False,  "Unable to connect to database.")
    try:
        curs = con.cursor()
    except Exception as e:
        print(e)
        return prepare_response(False,  "Unable to connect to database.")
    try:
        query = '''select APPLICATION_ID, APPLICATIONS.POSTING_ID, POSTINGS.TITLE, POSTINGS.DESCRIPTION, POSTINGS.LOCATION, POSTINGS.PREREQUISITES, APPLICATIONS.CREATED_AT, APPLICATIONS.UPDATED_AT,PROFESSORS.USER_ID, PROFESSORS.DEPARTMENT, PROFESSORS.DESIGNATION, USERS.DISPLAY_NAME, USERS.EMAIL, USERS.PHONE, STUDENT.GPA, STUDENT.MAJOR, STUDENT.MINOR, STUDENT.YEAR FROM APPLICATIONS JOIN POSTINGS ON APPLICATIONS.POSTING_ID = POSTINGS.POSTING_ID JOIN PROFESSORS ON POSTINGS.PROFESSOR = PROFESSORS.USER_ID JOIN USERS ON PROFESSORS.USER_ID = USERS.USER_ID JOIN STUDENT ON APPLICATIONS.STUDENT =  STUDENT.USER_ID'''
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


def update_application(data):
    try:
        con = connect()
    except:
        return prepare_response(False, "Unable to create DB connection")
    try:
        # Get the data from JSON Payload
        app_id = data["application_id"]
        status = data["status"]
        # Insert application into database
        cur = con.cursor()
        query = "UPDATE APPLICATIONS SET STATUS = :1, UPDATED_AT = SYSTIMESTAMP WHERE APPLICATION_ID = :2"
        params = [status,app_id]
        cur.execute(query, params)
        con.commit()
        return prepare_response(
            True, f"Application updated."
        )
    except Exception as e:
        print(e)
        return prepare_response(False, str(e))
    finally:
        disconnect(con)