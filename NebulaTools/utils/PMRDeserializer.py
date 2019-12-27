import json
from config import revit2017


class PMRDeserializer:
    def __init__(self, json_file):
        self.__json_data = json.load(json_file)["Data"]["Attributes"]["MainDocument"]

    @property
    def json_data(self):
        return self.__json_data

    def __get_revit_element(self, cat_name):
        for cats in self.json_data["RevitTypes"]:
            if cats["Name"] == f"Autodesk.Revit.DB.{cat_name}":
                return cats["Elements"]
        else:
            raise NameError(
                f"Autodesk.Revit.DB.{cat_name} invalid, Please provide a valid Revit Class Name. E.g. ProjectInfo"
            )

    def get_project_info(self):
        project_info = {"revit_file_path": self.json_data["FilePath"]}
        parameter_list = self.__get_revit_element("ProjectInfo")[0]["Parameters"]

        project_info_dict = revit2017["project_info"]

        for param in parameter_list:
            if param["Name"] in list(project_info_dict.keys()):
                project_db_keys = project_info_dict[param["Name"]]
                project_info[project_db_keys] = param["Value"]

        return project_info

    def get_level_info(self):
        level_elements = self.__get_revit_element("Level")
        level_info_map = revit2017["level_info"]
        level_info_list = []

        for lvl in level_elements:
            lvl_info = {"level_revit_id": lvl["Id"]}
            for param in lvl["Parameters"]:
                if param["Name"] in list(level_info_map.keys()):
                    lvl_db_keys = level_info_map[param["Name"]]
                    lvl_info[lvl_db_keys] = param["Value"]
            level_info_list.append(lvl_info)
            lvl_info = None

        return level_info_list

    def get_room_info(self):
        room_elements = self.__get_revit_element("Architecture.Room")
        room_info_map = revit2017["room_info"]

        for room in room_elements:
            room_info = {"room_revit_id": room["Id"]}

            for param in room["Parameters"]:



# This block is for testing the module in cls
def test_project_info():
    json_file = open(r"C:\Users\lxu4\Github_Projects\foo\data\Huai Hai Mall - P1.json")
    a = PMRDeserializer(json_file)
    print(a.json_data["FilePath"])
    project_info = a.get_project_info()
    print(project_info)
    pass


def test_level_info():
    json_file = open(r"C:\Users\lxu4\Github_Projects\foo\data\Huai Hai Mall - P1.json")
    a = PMRDeserializer(json_file)
    print(a.json_data["FilePath"])
    level_info = a.get_level_info()
    print(level_info)
    pass


if __name__ == "__main__":
    test_level_info()
