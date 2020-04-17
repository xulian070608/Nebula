import os 
import requests

def list_files(dir):
    r = []
    for root, dirs, files in os.walk(dir):
        for name in files:
            yield os.path.join(root, name)


img_list = list_files("/Users/chinavdc/Desktop/China_FF_E_Images")  

for p in img_list:
    if p[-3:] == "png" or p[-3:] == "jpg":
       
        url = "http://localhost:8000/images/upload/"
        data = {
            "tag": "ffe",
            "type": "image/png"
            }
        files = {"image":open(p, 'rb')}
        response = requests.post(url, data=data, files=files)
        print(response.content)