from dotenv import load_dotenv
import os
load_dotenv()

db_user = os.getenv('ORACLEDB_USERNAME')
db_pass = os.getenv('ORACLEDB_PASSWORD')
dsn = os.getenv("DSN")
db_config_dir = os.getenv("CONFIG_DIR")
db_wallet_location = os.getenv("WALLET_LOCATION")
db_wallet_password = os.getenv("WALLET_PASSWORD")
# with open(".secrets", "r") as f:
#     pass_string = f.readlines()[0]
#     db_pass = pass_string.split("=")[1].strip()
