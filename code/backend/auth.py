from utils import *
import bcrypt
import traceback


def register(data):
    '''
    ```
    /register [POST]
    Request:
    {
        email : string,
        password: string,
        display_name: string,
        type: string (Professor / Student),
        phone: string,
        if type == "Student":
            gpa: float,
            major: string,
            minor: string,
            degree: string,
            year: string
        elif type == "Professor":
            department: string,
            designation
    }
    Response:
    {
        status: boolean
        if status is True:
            data:{
                email: string,
                user_id: number,
                display_name: string
                type: string (Professor / Student)
            }
        else:
            data: string (containing an error message)
    }
    ```
    '''

    try:
        con = connect()
    except:
        return prepare_response(False, "Unable to create DB connection")
    try:
        # Get the data from JSON Payload
        email = data["email"].lower()
        password = bcrypt.hashpw(data["password"].encode(
            "utf-8"), bcrypt.gensalt()).decode("utf-8")
        user_type = data["type"]
        display_name = data["display_name"]
        phone = data["phone"] if "phone" in data.keys() else None

        # Check if email id is already present.
        cur = con.cursor()
        query = "SELECT email FROM USERS WHERE EMAIL = :1"
        params = [email]
        res = cur.execute(query, params)
        rows = res.fetchall()
        if len(rows):
            return prepare_response(
                False, f"User with the Email: {email} already exists."
            )
        # check if the same phone is already present
        query = "SELECT phone FROM USERS WHERE PHONE = :1"
        params = [phone]
        res = cur.execute(query, params)
        rows = res.fetchall()
        if len(rows):
            return prepare_response(
                False, f"User with Phone: {phone} already exists."
            )

        bind_user_id = cur.var(int)

        query = "INSERT INTO USERS (EMAIL, DISPLAY_NAME, PASSWORD, TYPE, PHONE) VALUES (:1,:2,:3,:4,:5) RETURNING USER_ID INTO :6"
        params = [email, display_name, password, user_type, phone, bind_user_id]
        cur.execute(query, params)

        user_id = bind_user_id.getvalue()[0]

        if user_type == "student":
            gpa = data["gpa"] if "gpa" in data.keys() else None
            major = data["major"] if "major" in data.keys() else None
            minor = data["minor"] if "minor" in data.keys() else None
            degree = data["degree"] if "degree" in data.keys() else None
            year = data["year"] if "year" in data.keys() else None
            query = "INSERT INTO STUDENT (USER_ID, DEGREE, YEAR, MAJOR, MINOR, GPA) VALUES (:1,:2,:3,:4,:5, :6)"
            params = [user_id, degree, year, major, minor, gpa]
            cur.execute(query, params)

        elif user_type == "professor":
            department = data["department"] if "department" in data.keys(
            ) else None
            designation = data["designation"] if "designation" in data.keys(
            ) else None
            query = "INSERT INTO PROFESSORS (USER_ID, DEPARTMENT, DESIGNATION) VALUES (:1,:2, :3)"
            params = [user_id, department, designation]
            cur.execute(query, params)

        con.commit()
        return prepare_response(
            True,
            {
                "email": email,
                "display_name": display_name,
                "type": user_type
            }
        )
    except Exception as e:
        print(e)
        return prepare_response(False, str(e))
    finally:
        disconnect(con)


def login(data):
    '''
    ```
    /login [POST]
    Request:
    {
        email : string,
        password: string
    }
    Response:
    {
        status: boolean,

        if status is True:
            data:{
                email: string,
                user_id: number,
                display_name: string
                type: string (Professor / Student)
            }
        else:
            data: string (containing an error message)
    }
    ```
    '''

    try:
        con = connect()
    except:
        return prepare_response(False, "Unable to create DB connection")
    try:
        # Get the data from JSON Payload
        email = data["email"].lower()
        password = data["password"]

        # Check if user exists
        cur = con.cursor()
        query = "SELECT display_name,email, password, user_id,type FROM USERS WHERE EMAIL = :1"
        params = [email]
        cur.execute(query, params)
        cur.rowfactory = makeDictFactory(cur)
        row = cur.fetchone()
        if row is None:
            return prepare_response(
                False, f"User with Email {email} doesn't exist. Please register first."
            )
        valid = bcrypt.checkpw(password.encode(
            "utf-8"), row["password"].encode("utf-8"))
        if valid:
            display_name = row["display_name"]
            user_id = row["user_id"]
            user_type = row["type"]
            return prepare_response(
                True,
                {
                    "email": email,
                    "user_id": user_id,
                    "display_name": display_name,
                    "type": user_type
                }
            )
        else:
            return prepare_response(False, "Invalid Credentials.")
    except Exception as e:
        print(e)
        return prepare_response(False, str(e))
    finally:
        disconnect(con)


def get_user_profile(data):
    '''
    ```
    /get_user_profile [POST]
    Request:
    {
        user_id: number
    }
    Response:
    {
        status: boolean,
        data:
        {
            user_id: number,
            display_name: string,
            email: string,
            phone: string,
            type: string,
            if type == "Student":
                gpa: float,
                major: string,
                minor: string,
                degree: string,
                year: string
            elif type == "Professor":
                department: string,
                designation: string
        }
    }
    ```
    '''
    try:
        con = connect()
    except:
        return prepare_response(False, "Unable to create DB connection")
    try:
        # Get the data from JSON Payload
        user_id = data["user_id"]

        cur = con.cursor()
        query = "SELECT * FROM USERS WHERE USER_ID = :1"
        params = [user_id]
        cur.execute(query, params)
        cur.rowfactory = makeDictFactory(cur)
        row = cur.fetchone()
        print(row)

        display_name = row["display_name"]
        user_id = row["user_id"]
        user_type = row["type"]
        email = row["email"]
        phone = row["phone"]
        data1 = {
            "email": email,
            "user_id": user_id,
            "display_name": display_name,
            "type": user_type,
            "phone": phone
        }
        if user_type == "student":
            query = "SELECT * FROM STUDENT WHERE USER_ID = :1"
            params = [user_id]
            cur.execute(query, params)
            cur.rowfactory = makeDictFactory(cur)
            row = cur.fetchone()

            data1["gpa"] = row["gpa"]
            data1["major"] = row["major"]
            data1["minor"] = row["minor"]
            data1["degree"] = row["degree"]
            data1["year"] = row["year"]

        elif user_type == "professor":
            query = "SELECT * FROM PROFESSORS WHERE USER_ID = :1"
            params = [user_id]
            cur.execute(query, params)
            cur.rowfactory = makeDictFactory(cur)
            row = cur.fetchone()

            data1["department"] = row["department"]
            data1["designation"] = row["designation"]

        return prepare_response(
            True, data1

        )
    except Exception as e:
        print(e)
        print(traceback.format_exc())
        return prepare_response(False, str(e))
    finally:
        disconnect(con)


def edit_profile(data):
    '''
    ```
    /edit_profile
    Request:
    {
        user_id: number,
        email : string,
        password: string,
        display_name: string,
        type: string (Professor / Student),
        phone: string,
        if type == "Student":
            gpa: float,
            major: string,
            minor: string,
            degree: string,
            year: string
        elif type == "Professor":
            department: string,
            designation
    }
    Response:
    {
        status: boolean
        data: (Success / Error message as per status)
    }
    ```

    '''
    try:
        con = connect()
    except:
        return prepare_response(False, "Unable to create DB connection")
    try:
        # Get the data from JSON Payload
        email = data["email"]
        user_id = data["user_id"]
        # password = bcrypt.hashpw(data["password"].encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
        user_type = data["type"]
        display_name = data["display_name"]
        phone = data["phone"]

        # Check if email id is already present.
        cur = con.cursor()
        query = "SELECT * FROM USERS WHERE USER_ID = :1"
        params = [user_id]
        cur.execute(query, params)
        cur.rowfactory = makeDictFactory(cur)
        rows = cur.fetchone()

        old_email = rows["email"]
        old_phone = rows["phone"]

        if(old_email != email):
            query = "SELECT email FROM USERS WHERE EMAIL = :1"
            params = [email]
            res = cur.execute(query, params)
            rows = res.fetchall()
            if len(rows):
                return prepare_response(
                    False, f"User with email {email} already exists."
                )
        if(old_phone != phone):
            # check if the same phone is already present
            query = "SELECT phone FROM USERS WHERE PHONE = :1"
            params = [phone]
            res = cur.execute(query, params)
            rows = res.fetchall()
            if len(rows):
                return prepare_response(
                    False, f"User with phone {phone} already exists."
                )
        query = "UPDATE USERS SET EMAIL = :1, DISPLAY_NAME = :2, TYPE = :3, PHONE = :4 WHERE USER_ID = :5"
        params = [email, display_name, user_type, phone, user_id]
        cur.execute(query, params)

        if user_type == "student":
            gpa = data["gpa"]
            major = data["major"]
            minor = data["minor"]
            degree = data["degree"]
            year = data["year"]
            query = "UPDATE STUDENT SET DEGREE = :1, YEAR = :2, MAJOR = :3, MINOR = :4, GPA = :5 WHERE USER_ID = :6"
            params = [degree, year, major, minor, gpa, user_id]
            cur.execute(query, params)

        elif user_type == "professor":
            department = data["department"]
            designation = data["designation"]
            query = "UPDATE PROFESSORS SET DEPARTMENT = :1,DESIGNATION = :2 WHERE USER_ID = :3"
            params = [department, designation, user_id]
            cur.execute(query, params)

        con.commit()
        return prepare_response(
            True, "Profile Updated Successfully"
        )
    except Exception as e:
        print(e)
        return prepare_response(False, str(e))
    finally:
        disconnect(con)
