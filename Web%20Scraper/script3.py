import os
import pymongo

# PyMongo
client = pymongo.MongoClient("")
db = client.IWS

for f in os.listdir("/home/arpanjain/Downloads/images"):
    filename = f.split(".")[0]
    db.properties.find_one_and_update({ "zpid": filename }, { "$set" : { "image": f"https://iwswebsite.blob.core.windows.net/images/{f}" } })
