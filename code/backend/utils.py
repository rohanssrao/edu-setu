# import pymongo
# ENDPOINT = "edusetu-db.clsvfaaqg2f4.us-east-1.rds.amazonaws.com"
# PORT = 3306

# client = pymongo.MongoClient(
#     "mongodb+srv://edusetu:EduSetuGroup2@edusetucluster.wtihp71.mongodb.net/?retryWrites=true&w=majority")
# db = client.test
# print(db)

import boto3
client = boto3.client('rds')
print(client)
