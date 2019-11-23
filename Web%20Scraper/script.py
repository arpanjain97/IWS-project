import requests
import pprint
import time
from xmljson import Yahoo
from xml.etree.ElementTree import fromstring
import pymongo

TIME_DELAY = 2.0
# PyMongo
client = pymongo.MongoClient("")
db = client.IWS

# Script
bf = Yahoo(dict_type=dict)
URL = "http://www.zillow.com/webservice/GetSearchResults.htm"
#items = { "Miami, FL": ["888 Biscayne Blvd APT 1906", "570 NE 64th St APT 5", "900 Brickell Key Blvd APT 1503", "253 NE 2nd St APT 1201", "3635 Ne 1st Ave"] }
items = { "Dublin, CA": ["5778 Southbridge Way"]}
for csz,adds in items.items():
    for add in adds:
        n = 5
        while n > 0:
            try:
                PARAMS = { "zws-id": "", "address": add, "citystatezip": csz }
                xml_data = requests.get(url=URL, params=PARAMS)
                root = fromstring(xml_data.text)
                for result in root.iter("result"):
                    json_data = bf.data(result)
                    # pprint.pprint(json_data["result"])
                    db.properties.insert_one(json_data["result"])
                    print("Success")
                    break
            except Exception as e:
                print(e)
                print("Retrying")
                time.sleep(TIME_DELAY)
                n -= 1
                continue
            break
        if n == 0:
            print("Failed")
        time.sleep(TIME_DELAY)
