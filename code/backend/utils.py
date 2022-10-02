import cx_Oracle
from config import *

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0].lower()] = row[idx]
    return d


def connect():
    try:
        con = cx_Oracle.connect(db_user, db_pass, db_conn)
        con.row_factory = dict_factory
    except:
        con = None
    return con


def disconnect(con):
    try:
        if con:
            con.close()
    except:
        pass