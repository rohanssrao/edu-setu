db_user = "ADMIN"
db_pass = None
with open(".secrets", "r") as f:
    pass_string = f.readlines()[0]
    db_pass = pass_string.split("=")[1].strip()
db_conn = "edusetudb_high"
