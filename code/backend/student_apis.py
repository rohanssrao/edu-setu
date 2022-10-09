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
        query = '''WITH student_data
     AS (SELECT applications.application_id AS student_application_id,
                applications.posting_id     AS student_posting_id,
                applications.student,
                users.display_name          AS student_display_name,
                users.email                 AS student_email,
                users.phone                 AS student_phone,
                applications.CREATED_AT,
                applications.UPDATED_AT,
                applications.status,
                applications.remarks,
                student.degree,
                student.gpa,
                student.major,
                student.minor,
                student.year
         FROM   applications,
                student,
                users
         WHERE  applications.student = student.user_id
                AND users.user_id = student.user_id),
     professor_data
     AS (SELECT applications.application_id AS professor_application_id,
                applications.posting_id     AS professor_posting_id,
                postings.title,
                postings.description,
                postings.location,
                postings.prerequisites,
                postings.professor,
                users.display_name          AS professor_display_name,
                users.email                 AS professor_email,
                users.phone                 AS professor_phone,
                professors.department,
                professors.designation
         FROM   applications,
                postings,
                users,
                professors
         WHERE  applications.posting_id = postings.posting_id
                AND postings.professor = professors.user_id
                AND users.user_id = professors.user_id)
SELECT student_application_id AS application_id,
       student_posting_id     AS posting_id,
       title , description, location, prerequisites, CREATED_AT, UPDATED_AT, STATUS,REMARKS,
       professor as professor_user_id,
       professor_email, department, designation, professor_display_name, 
       student as student_user_id,
       student_display_name, student_email, student_phone, gpa, major, minor, year



FROM   student_data,
       professor_data
WHERE  student_data.student_application_id =
       professor_data.professor_application_id
       AND student_data.student_posting_id =
professor_data.professor_posting_id 
AND student = :1'''
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
            True, f"Application Added Successfully."
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
        query = '''WITH student_data
     AS (SELECT applications.application_id AS student_application_id,
                applications.posting_id     AS student_posting_id,
                applications.student,
                users.display_name          AS student_display_name,
                users.email                 AS student_email,
                users.phone                 AS student_phone,
                applications.CREATED_AT,
                applications.UPDATED_AT,
                applications.status,
                applications.remarks,
                student.degree,
                student.gpa,
                student.major,
                student.minor,
                student.year
         FROM   applications,
                student,
                users
         WHERE  applications.student = student.user_id
                AND users.user_id = student.user_id),
     professor_data
     AS (SELECT applications.application_id AS professor_application_id,
                applications.posting_id     AS professor_posting_id,
                postings.title,
                postings.description,
                postings.location,
                postings.prerequisites,
                postings.professor,
                users.display_name          AS professor_display_name,
                users.email                 AS professor_email,
                users.phone                 AS professor_phone,
                professors.department,
                professors.designation
         FROM   applications,
                postings,
                users,
                professors
         WHERE  applications.posting_id = postings.posting_id
                AND postings.professor = professors.user_id
                AND users.user_id = professors.user_id)
SELECT student_application_id AS application_id,
       student_posting_id     AS posting_id,
       title , description, location, prerequisites, CREATED_AT, UPDATED_AT, STATUS,REMARKS,
       professor as professor_user_id,
       professor_email, department, designation, professor_display_name, 
       student as student_user_id,
       student_display_name, student_email, student_phone, gpa, major, minor, year



FROM   student_data,
       professor_data
WHERE  student_data.student_application_id =
       professor_data.professor_application_id
       AND student_data.student_posting_id =
professor_data.professor_posting_id '''
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
        remarks = data["remarks"] if "remarks" in  data.keys() else None
        
        # Insert application into database
        cur = con.cursor()
        query = "UPDATE APPLICATIONS SET STATUS = :1, REMARKS = :2 , UPDATED_AT = SYSTIMESTAMP WHERE APPLICATION_ID = :3"
        params = [status,remarks,app_id]
        cur.execute(query, params)
        con.commit()
        return prepare_response(
            True, f"Application Updated Successfully."
        )
    except Exception as e:
        print(e)
        return prepare_response(False, str(e))
    finally:
        disconnect(con)