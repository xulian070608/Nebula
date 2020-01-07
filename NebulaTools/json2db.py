from utils.PMR.PMRDeserializer import PMRDeserializer
import json
from utils.DBWrite import DBWrite

with open(r"data\\696 Weihai - P2.json") as json_file:
    json_data = json.load(json_file)
    json_file.close()

deseriliazer = PMRDeserializer(json_data)

project_info = deseriliazer.get_project_info()
level_list = deseriliazer.get_level_info()
room_list = deseriliazer.get_room_info()

print(room_list[1])
dbwriter = DBWrite()

project_uuid = dbwriter.insert_project(project_info)
dbwriter.insert_level(level_list)
dbwriter.insert_room(room_list)
