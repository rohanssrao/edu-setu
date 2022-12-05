from utils import *
import bcrypt
import datetime
import traceback
import json


def add_posting(data):

    """
    ```
    Request:
    {
        title: string,
        professor: number (user id of professor),
        description: string,
        location: string,
        prerequisites: string,
        gpa: float,
        degree: string,
        job_type: string
    }
    Response:
    {
        status: boolean
        data: message (Success / Error message as per status)
        // CREATED_AT and UPDATED_AT timestamps to be appropriately set by the API
    }
    ```
    """

    try:
        con = connect()
    except:
        return prepare_response(False, "Unable to create DB connection")
    try:
        # Get the data from JSON Payload
        professor = data["professor"]
        title = data["title"]
        job_type = data["job_type"]
        description = data["description"]
        location = data["location"]
        prerequisites = data["prerequisites"]
        questions = []
        gpa = data["gpa"] if "gpa" in data else None
        degree = json.dumps(data["degree"]) if "degree" in data else None

        # load in application questions as list - 10 is max # of questions
        for i in range(10):
            if ("application question " + str(i)) in data:
                questions.append(data["application question " + str(i)])

        # Insert application into database
        cur = con.cursor()
        bind_id = cur.var(int)
        query = "INSERT INTO POSTINGS ( TITLE, PROFESSOR, DESCRIPTION, LOCATION, \
          PREREQUISITES, GPA, DEGREE, JOB_TYPE, CREATED_AT, UPDATED_AT ) VALUES (:1,:2,:3,:4,:5,:6,:7,:8,SYSTIMESTAMP,SYSTIMESTAMP) \
          RETURNING POSTING_ID into :9"
        params = [
            title,
            professor,
            description,
            location,
            prerequisites,
            gpa,
            degree,
            job_type,
            bind_id,
        ]
        cur.execute(query, params)

        # Get id of inserted
        inserted_id = bind_id.getvalue()[0]

        # Insert application questions to database
        for i in range(len(questions)):
            query = "INSERT INTO POSTING_QUESTIONS ( QUESTION, POSTING_ID, CREATED_AT, UPDATED_AT) VALUES (:1, :2, SYSTIMESTAMP, SYSTIMESTAMP)"
            params = [questions[i], inserted_id]
            cur.execute(query, params)

        con.commit()
        return prepare_response(True, f"Posting Added Successfully.")
    except Exception as e:
        print(e)
        return prepare_response(False, str(e))
    finally:
        disconnect(con)


def get_all_postings():
    """
        ```
        /get_all_postings [GET]
    Request: N/A
    Response:
    {
            status: boolean,

            if status is True:
                    data:
                    [
                            {
                                    posting_id: number,
                                    title: string,
                                    description: string,
                                    professor_email: string,
                                    professor_department: string,
                                    professor_designation: string
                                    professor_display_name: string,
                                    location: string,
                                    prerequisites: string,
                                    gpa: float,
                                    degree: string,
                                    created_at: string,
                                    updated_at: string
                            }
                    ]
            else:
            data: string (error message)
    }
    ```
    """

    con = connect()
    if not con:
        return prepare_response(False, "Unable to connect to database.")
    try:
        curs = con.cursor()
    except Exception as e:
        print(e)
        return prepare_response(False, "Unable to connect to database.")
    try:
        # query = '''select POSTING_ID, TITLE, DESCRIPTION, USERS.EMAIL, PROFESSORS.DEPARTMENT, PROFESSORs.DESIGNATION, USERS.DISPLAY_NAME, LOCATION, PREREQUISITES, CREATED_AT, UPDATED_AT from USERS JOIN PROFESSORS ON USERS.USER_ID = PROFESSORS.USER_ID JOIN POSTINGS ON PROFESSORS.USER_ID = POSTINGS.PROFESSOR'''
        query = """select POSTING_ID, TITLE, DESCRIPTION, JOB_TYPE, USERS.EMAIL, PROFESSORS.DEPARTMENT, PROFESSORs.DESIGNATION, USERS.DISPLAY_NAME, LOCATION, PREREQUISITES, CREATED_AT, UPDATED_AT from USERS JOIN PROFESSORS ON USERS.USER_ID = PROFESSORS.USER_ID JOIN POSTINGS ON PROFESSORS.USER_ID = POSTINGS.PROFESSOR"""
        curs.execute(query)
        curs.rowfactory = makeDictFactory(curs)
        response = curs.fetchall()
        print("Response:")
        print(response)
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


def get_questions_by_posting(data):
    """
    Request:
    {
        posting_id: number,
    }
    Response:
    {
        status: boolean
        data:
        {
            posting_id: number,
            question_id: number,
            question: string,
            created_at: string,
            updated_at: string
        }
    }
    """
    con = connect()
    if not con:
        return prepare_response(False, "Unable to connect to database.")
    try:
        curs = con.cursor()
    except Exception as e:
        print(e)
        return prepare_response(False, "Unable to connect to database.")
    try:
        # Get Questions
        print(data)
        posting_id = data["posting_id"]
        query = """SELECT * FROM POSTING_QUESTIONS WHERE POSTING_ID = :1"""
        params = [posting_id]
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
        traceback.print_exc()
        return {"status": False, "data": str(e)}
    finally:
        try:
            con.close()
        except:
            pass


def get_all_postings_by_professor(data):

    """
    ```
    Request:
    {

        student: number (user id of student),

    }
    Response:
    {
        status: boolean
        data:
        {
            posting_id: number,
            title: string,
            professor: number (user id of professor)
            description: string,
            location: string,
            prerequisites: string,
            gpa: float,
            degree: string,
            created_at: string,
            updated_at: string,
            questions: array
        }

    }
    ```
    """

    con = connect()
    if not con:
        return prepare_response(False, "Unable to connect to database.")
    try:
        curs = con.cursor()
    except Exception as e:
        print(e)
        return prepare_response(False, "Unable to connect to database.")
    try:
        # Get Postings
        professor = data["professor"]
        query = """SELECT * FROM POSTINGS WHERE PROFESSOR = :1"""
        params = [professor]
        curs.execute(query, params)
        curs.rowfactory = makeDictFactory(curs)
        response = curs.fetchall()

        # Convert degree from JSON array back to list
        for app in response:
            app["degree"] = json.loads(app["degree"]) if app["degree"] else []

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

    """
    ```
    /update_posting [POST]
    Request:
    {
        posting_id: number,
        title: string,
        description: string,
        location: string,
        prerequisites: string,
        gpa: float,
        degree: string,
        job_type: string,
        questions: array
    }
    Response:
    {
        status: boolean
        data: (Success / Error message as per status)
        // UPDATED_AT timestamp should be auto updated by the API
    }
    ```
    """

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
        job_type = data["job_type"]
        questions = []
        gpa = data["gpa"] if "gpa" in data else None
        degree = json.dumps(data["degree"]) if "degree" in data else None

        # load in application questions as list - 10 is max # of questions
        for i in range(10):
            if ("application question " + str(i)) in data:
                questions.append(data["application question " + str(i)])

        # Insert application into database
        cur = con.cursor()
        query = "UPDATE POSTINGS SET TITLE = :1, DESCRIPTION = :2, LOCATION = :3, PREREQUISITES = :4, GPA = :5, DEGREE = :6, JOB_TYPE = :7, UPDATED_AT = SYSTIMESTAMP WHERE posting_id = :8"
        params = [
            title,
            description,
            location,
            prerequisites,
            gpa,
            degree,
            job_type,
            posting_id,
        ]
        cur.execute(query, params)

        # Update questions in database
        query = "DELETE FROM POSTING_QUESTIONS WHERE POSTING_ID= :1"
        params = [posting_id]
        cur.execute(query, params)

        for i in range(len(questions)):
            query = "INSERT INTO POSTING_QUESTIONS ( QUESTION, POSTING_ID, CREATED_AT, UPDATED_AT) VALUES (:1, :2, SYSTIMESTAMP, SYSTIMESTAMP)"
            params = [questions[i], posting_id]
            cur.execute(query, params)
        con.commit()
        return prepare_response(True, f"Posting Updated Successfully.")
    except Exception as e:
        print(e)
        return prepare_response(False, str(e))
    finally:
        disconnect(con)


def get_responses_for_application(data):
    con = connect()
    if not con:
        return prepare_response(False, "Unable to connect to database.")
    try:
        curs = con.cursor()
    except Exception as e:
        print(e)
        return prepare_response(False, "Unable to connect to database.")
    try:
        # Get Postings
        application = data["application"]
        query = """SELECT * FROM POSTING_RESPONSES JOIN POSTING_QUESTIONS ON POSTING_RESPONSES.QUESTION_ID=POSTING_QUESTIONS.QUESTION_ID WHERE APPLICATION_ID = :1"""
        params = [application]
        curs.execute(query, params)
        curs.rowfactory = makeDictFactory(curs)
        response = curs.fetchall()
        print(response)

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


def get_applications_for_professor(data):

    """
        ```
        /get_applications_for_professor [POST]
    Request:
    {
            professor: number
    }
    Response:
    {
            status: boolean
            data:
            [
                    {
                            professor: number
                            position_id: number,
                            title: string,
                            description: string,
                            prerequisites: string,
                            gpa: float,
                degree: string,
                            applications: // A list of all the applications for this position_id
                            [
                                    {
                                            application_id: number
                                            student_user_id: number,
                                            student_display_name: string,
                                            student_email: string,
                                            student_phone: string,
                                            student_gpa: float,
                                            student_major: string,
                                            student_minor: string,
                                            student_year: string,
                                            status: string // This is the status of the application and NOT the response.
                                            remarks: string,
                        responses: array

                                    }
                            ]
                    }
            ]
    }
        ```
    """

    con = connect()
    if not con:
        return prepare_response(False, "Unable to connect to database.")
    try:
        curs = con.cursor()
    except Exception as e:
        print(e)
        return prepare_response(False, "Unable to connect to database.")
    try:
        professor = data["professor"]
        query = """SELECT postings.posting_id,
        postings.professor as professor_user_id,
        postings.title,
        postings.description,
        postings.prerequisites,
        postings.gpa,
        postings.degree,
        applications.application_id,
        student.user_id AS student_user_id,
        student.skills AS student_skills,
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
        where postings.PROFESSOR= :1 and application_id is not NULL
        order by postings.POSTING_ID"""
        params = [professor]
        curs.execute(query, params)
        curs.rowfactory = makeDictFactory(curs)
        response = curs.fetchall()
        res = {}
        pos_id = []
        for row in response:
            if row["posting_id"] in pos_id and row["status"] != "Withdrawn":
                dcit1 = {}
                dcit1["application_id"] = row["application_id"]
                dcit1["student_user_id"] = row["student_user_id"]
                dcit1["student_display_name"] = row["student_display_name"]
                dcit1["student_email"] = row["student_email"]
                dcit1["student_phone"] = row["student_phone"]
                dcit1["student_skills"] = row["student_skills"]
                dcit1["student_gpa"] = row["student_gpa"]
                dcit1["student_major"] = row["student_major"]
                dcit1["student_minor"] = row["student_minor"]
                dcit1["student_year"] = row["student_year"]
                dcit1["status"] = row["status"]
                res[row["posting_id"]]["Applications"].append(dcit1)

            else:
                if row["status"] != "Withdrawn":
                    pos_id.append(row["posting_id"])
                    temp = {}
                    temp["professor_user_id"] = row["professor_user_id"]
                    temp["posting_id"] = row["posting_id"]
                    temp["title"] = row["title"]
                    temp["description"] = row["description"]
                    temp["prerequisites"] = row["prerequisites"]
                    temp["gpa"] = row["gpa"]
                    temp["degree"] = row["degree"]
                    res[row["posting_id"]] = temp
                    dcit1 = {}
                    dcit1["application_id"] = row["application_id"]
                    dcit1["student_user_id"] = row["student_user_id"]
                    dcit1["student_display_name"] = row["student_display_name"]
                    dcit1["student_email"] = row["student_email"]
                    dcit1["student_phone"] = row["student_phone"]
                    dcit1["student_skills"] = row["student_skills"]
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


def delete_posting(data):

    """
    ```
    /delete_posting [POST]
    Request:
    {
        posting_id : number ,
    }
    Response:
    {
        status: boolean,
        data: message (Success / Error message as per status)
    }
    ```

    """

    try:
        con = connect()
    except:
        return prepare_response(False, "Unable to create DB connection")
    try:
        # Get the data from JSON Payload
        posting_id = data["posting_id"]
        cur = con.cursor()

        # Get all answers linked to this post
        query = "SELECT application_id from APPLICATIONS where posting_id = :1"
        params = [posting_id]
        cur.execute(query, params)
        app_ids_to_delete = cur.fetchall()
        print(app_ids_to_delete)

        for id in app_ids_to_delete:
            query = "DELETE FROM POSTING_RESPONSES WHERE application_id = :1"
            params = [id[0]]
            cur.execute(query, params)

        query = "DELETE FROM POSTING_QUESTIONS WHERE posting_id = :1"
        params = [posting_id]
        cur.execute(query, params)

        # Delete from all applications
        for id in app_ids_to_delete:
            query = "DELETE FROM APPLICATIONS WHERE application_id = :1"
            params = [id[0]]
            cur.execute(query, params)

        query = "DELETE FROM POSTINGS WHERE posting_id = :1"
        params = [posting_id]
        cur.execute(query, params)
        con.commit()
        return prepare_response(True, f"Posting Deleted.")
    except Exception as e:
        print(e)
        return prepare_response(False, str(e))
    finally:
        disconnect(con)
