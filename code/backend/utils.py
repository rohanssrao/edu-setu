import cx_Oracle

db = cx_Oracle.connect("ADMIN", "EduSetuGroup2", "edusetudb_high")

print(db)
