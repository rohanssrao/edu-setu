from os import posix_fallocate
from utils import *
import bcrypt
import datetime

def add_posting(data):
    try:
        con = connect()
    except:
        return prepare_response(False, "Unable to create DB connection")
    try:
        # Get the data from JSON Payload
        professor = data["professor"]
        title = data["title"]
        description = data["description"]
        location = data["location"]
        prerequisites = data["prerequisites"]
        # created_at = 
        # updated_at = 
        # Insert application into database
        cur = con.cursor()
        query = "INSERT INTO POSTINGS ( TITLE, PROFESSOR, DESCRIPTION, LOCATION, PREREQUISITES, CREATED_AT, UPDATED_AT ) VALUES (:1,:2,:3,:4,:5,SYSTIMESTAMP,SYSTIMESTAMP)"
        params = [title, professor, description, location, prerequisites]
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
        query = '''select POSTING_ID, TITLE, DESCRIPTION, USERS.EMAIL, PROFESSORS.DEPARTMENT, PROFESSORs.DESIGNATION, USERS.DISPLAY_NAME, LOCATION, PREREQUISITES, CREATED_AT, UPDATED_AT from USERS JOIN PROFESSORS ON USERS.USER_ID = PROFESSORS.USER_ID JOIN POSTINGS ON PROFESSORS.USER_ID = POSTINGS.PROFESSOR'''
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
        professor = data["professor"]
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



def update_posting(data):
    try:
        con = connect()
    except:
        return prepare_response(False, "Unable to create DB connection")
    try:
        # Get the data from JSON Payload
        posting_id = data["posting_id"]
        title = data["title"]
        description = data["description"]
        location = data["location"]
        prerequisites = data["prerequisites"]
        # created_at = 
        # updated_at = 
        # Insert application into database
        cur = con.cursor()
        query = "UPDATE POSTINGS SET TITLE = :1, posting_id = :2, DESCRIPTION = :3, LOCATION = :4, PREREQUISITES = :5, UPDATED_AT = SYSTIMESTAMP WHERE posting_id = :2" 
        params = [title, posting_id, description, location, prerequisites]
        cur.execute(query, params)
        con.commit()
        return prepare_response(
            True, f"posting updated."
        )
    except Exception as e:
        print(e)
        return prepare_response(False, str(e))
    finally:
        disconnect(con)
        

def get_applications_for_professor(data):
    con = connect()
    if not con:
        return prepare_response(False,  "Unable to connect to database.")
    try:
        curs = con.cursor()
    except Exception as e:
        print(e)
        return prepare_response(False,  "Unable to connect to database.")
    try:
        professor = data["professor"]
        query = '''SELECT postings.posting_id,
       postings.professor as professor_user_id,
       title,
       description,
       prerequisites,
       applications.application_id,
	   student.user_id AS student_user_id,
       users.display_name AS student_display_name,
	   users.email AS student_email,
 	   users.phone AS student_phone,
	   student.gpa AS student_gpa,
	   student.major AS student_major,
	   student.minor AS student_minor,
	   student.year AS	student_year,
       applications.status
       
					
FROM   postings 
FULL OUTER JOIN applications on APPLICATIONS.posting_id = postings.POSTING_ID
FULL OUTER JOIN student on applications.student = student.USER_ID
left OUTER JOIN USERS on users.user_id = student.user_id
where postings.PROFESSOR= :1
order by postings.POSTING_ID'''
        params = [professor]
        curs.execute(query, params)
        curs.rowfactory = makeDictFactory(curs)
        response = curs.fetchall()
        res = {}
        pos_id = []
        for row in response:
            if row["posting_id"] in pos_id:
                dcit1 = {}
                dcit1["application_id"] = row["application_id"]
                dcit1["student_user_id"] = row["student_user_id"]
                dcit1["student_display_name"] = row["student_display_name"]
                dcit1["student_email"] = row["student_email"]
                dcit1["student_phone"] = row["student_phone"]
                dcit1["student_gpa"] = row["student_gpa"]
                dcit1["student_major"] = row["student_major"]
                dcit1["student_minor"] = row["student_minor"]
                dcit1["student_year"] = row["student_year"]
                dcit1["status"] = row["status"]
                res[row["posting_id"]]["Applications"].append(dcit1)
        
    
            else:
                pos_id.append(row["posting_id"])
                temp = {}
                temp["professor_user_id"] = row["professor_user_id"]
                temp["posting_id"] = row["posting_id"]
                temp["title"] = row["title"]
                temp["description"] = row["description"]
                temp["prerequisites"] = row["prerequisites"]
                res[row["posting_id"]] = temp;
                dcit1 = {}
                dcit1["application_id"] = row["application_id"]
                dcit1["student_user_id"] = row["student_user_id"]
                dcit1["student_display_name"] = row["student_display_name"]
                dcit1["student_email"] = row["student_email"]
                dcit1["student_phone"] = row["student_phone"]
                dcit1["student_gpa"] = row["student_gpa"]
                dcit1["student_major"] = row["student_major"]
                dcit1["student_minor"] = row["student_minor"]
                dcit1["student_year"] = row["student_year"]
                dcit1["status"] = row["status"]
                res[row["posting_id"]]["Applications"] = []
                res[row["posting_id"]]["Applications"].append(dcit1)
        
        response = list(res.values())

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

