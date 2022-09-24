import cx_Oracle

db = cx_Oracle.connect("ADMIN", "EduSetuGroup1", "edusetudb_high")

print(db)
