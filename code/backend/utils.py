
import oracledb
from config import db_user, db_pass, db_config_dir, db_wallet_location, db_wallet_password, dsn


def makeDictFactory(cursor):
    columnNames = [d[0].lower() for d in cursor.description]

    def createRow(*args):
        return dict(zip(columnNames, args))
    return createRow


def connect():
    try:
        con = oracledb.connect(user=db_user, password=db_pass, 
          dsn=dsn, config_dir=db_config_dir, wallet_location=db_wallet_location,
          wallet_password=db_wallet_password)
    except Exception as e:
        print(e)
        con = None
    return con


def disconnect(con):
    try:
        if con:
            con.close()
    except:
        pass


def prepare_response(status, data):
    return {"status": status, "data": data}
