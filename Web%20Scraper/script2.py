import pymongo
import random

# PyMongo
client = pymongo.MongoClient("")
db = client.IWS

ls= []
for property in db.properties.find():
    # valuation = random.randrange(100000, 200000)
    # if "content" in property["zestimate"]["amount"].keys():
    #     valuation = property["zestimate"]["amount"]["content"]
    # db.properties.find_one_and_update({ "zpid": property["zpid"] }, { "$set": { "amount": valuation }})
    print(property["amount"])
