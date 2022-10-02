import cx_Oracle
from config import *


def makeDictFactory(cursor):
    columnNames = [d[0].lower() for d in cursor.description]
    def createRow(*args):
        return dict(zip(columnNames, args))
    return createRow

def connect():
    try:
        con = cx_Oracle.connect(db_user, db_pass, db_conn)
    except Exception as e:
        con = None
    return con


def disconnect(con):
    try:
        if con:
            con.close()
    except:
        pass

d = connect()
print(d)
