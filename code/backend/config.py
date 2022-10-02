db_user = "ADMIN"
db_pass = None
with open(".secrets","r") as f:
    pass_string = f.read()
    db_pass = pass_string.split("=")[1].strip()
db_conn = "edusetudb_high"
