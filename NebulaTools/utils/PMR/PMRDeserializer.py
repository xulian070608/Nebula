from .settings import revit2017
import uuid
import collections


class PMRDeserializer:
    def __init__(self, json_data):
        self.__json_data = json_data["Data"]["Attributes"]["MainDocument"]
        self.level_id_dict = {}

    @property
    def json_data(self):
        return self.__json_data

    def __get_revit_element(self, cat_name, category):
        for cats in self.json_data["RevitTypes"]:
            if (
                cats["Name"] == f"Autodesk.Revit.DB.{cat_name}"
                and cats["Category"] == category
            ):
                return cats["Elements"]
        else:
            raise NameError(
                f"Autodesk.Revit.DB.{cat_name} invalid, Please provide a valid Revit Class Name. E.g. ProjectInfo"
            )

    def get_project_info(self):
        project_info = {"revit_file_path": self.json_data["FilePath"]}
        parameter_list = self.__get_revit_element("ProjectInfo", "ProjectInformation")[
            0
        ]["Parameters"]

        project_info_dict = revit2017["project_info"]

        for param in parameter_list:
            if param["Id"] in list(project_info_dict.keys()):
                project_db_keys = project_info_dict[param["Id"]]
                project_info[project_db_keys] = param["Value"]
        self.project_uuid = project_info["building_uuid"]
        return project_info

    def get_level_info(self):
        level_elements = self.__get_revit_element("Level", "Level")
        level_info_map = revit2017["level_info"]
        level_info_list = []

        for lvl in level_elements:

            lvl_info = {"level_revit_id": str(lvl["Id"])}
            for param in lvl["Parameters"]:
                if param["Id"] in list(level_info_map.keys()):
                    lvl_db_keys = level_info_map[param["Id"]]
                    lvl_info[lvl_db_keys] = param["Value"]
                    lvl_info["level_uuid"] = str(uuid.uuid4())
                    lvl_info["project"] = self.project_uuid
            if lvl_info["level_name"] != "CONTAINER LEVEL":
                self.level_id_dict[str(lvl_info["level_revit_id"])] = lvl_info[
                    "level_uuid"
                ]
                lvl_info = collections.OrderedDict(sorted(lvl_info.items()))
                level_info_list.append(lvl_info)

            lvl_info = None

        return level_info_list

    def get_room_info(self):
        room_elements = self.__get_revit_element("Architecture.Room", "Room")
        room_info_map = revit2017["room_info"]
        room_info_list = []

        for room in room_elements:
            room_info = {"room_revit_id": room["Id"]}
            # get data from room parameters
            for param in room["Parameters"]:
                if param["Id"] in list(room_info_map.keys()):
                    key = room_info_map[param["Id"]]
                    room_info[key] = param["Value"]

            # get room boundary data
            room_info["outline"] = f"{self.__get_room_boundary(room)}"
            # print(room_info["outline"])
            room_info["level_id"] = self.level_id_dict.get(room_info["level_revit_id"])
            room_info["room_uuid"] = str(uuid.uuid4())
            # room_info["has_av"] = bool(room_info["has_av"])
            # room_info["has_window"] = bool(room_info["has_window"])
            if room_info["level_id"]:
                room_info = collections.OrderedDict(sorted(room_info.items()))
                room_info_list.append(room_info)
            room_info = {}

        return room_info_list

    def __get_room_boundary(self, element):
        # get the boundary data of a room
        boundary_segments = element["GetBoundarySegments"]
        room_outline = []
        for segment in boundary_segments:
            object_box = []
            enumerator = segment["GetEnumerator"]
            for i in range(len(enumerator)):
                tessellate = enumerator[i]["GetCurve"]["Tessellate"]
                if i == 0:
                    first_x = tessellate[0]["X"]
                    first_y = tessellate[0]["Y"]
                    first_point = (first_x, first_y)
                    object_box.append(first_point)
                    second_x = tessellate[1]["X"]
                    second_y = tessellate[1]["Y"]
                    second_point = (second_x, second_y)
                    object_box.append(second_point)
                if i > 0:
                    point_x = tessellate[1]["X"]
                    point_y = tessellate[1]["Y"]
                    n_point = (point_x, point_y)
                    object_box.append(n_point)

            room_outline.append(tuple(object_box))
            return tuple(object_box)

    def get_ws_info(self):
        #  ws_elements = self.__get_revit_element("FamilyInstance", "FurnitureSystem")
        pass


def test_project_info():  # noqa: E999, E112
    json_file = open(
        r"C:\Users\lxu4\Github_Projects\Nebula\data\Huai Hai Mall - P1.json"
    )
    a = PMRDeserializer(json_file)
    print(a.json_data["FilePath"])
    project_info = a.get_project_info()
    print(project_info)
    pass


def test_level_info():
    json_file = open(
        r"C:\Users\lxu4\Github_Projects\Nebula\data\Huai Hai Mall - P1.json"
    )
    a = PMRDeserializer(json_file)
    print(a.json_data["FilePath"])
    level_info = a.get_level_info()
    print(level_info)
    pass


def test_room_info():
    json_file = open(
        r"C:\Users\lxu4\Github_Projects\Nebula\data\Huai Hai Mall - P1.json"
    )
    a = PMRDeserializer(json_file)
    print(a.json_data["FilePath"])
    room_info = a.get_room_info()
    print(len(room_info))
    print(room_info[10])
    pass


if __name__ == "__main__":
    test_project_info()
