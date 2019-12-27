import json
import config


JSON_CONTENT = {
    "FilePath": None,
    "ProjectInfo": {},
    "ProjectLocation": {},
    "LevelInfo": {},
    "RoomInfo": {},
}

ROOT_PATH = "SHA_WEIHAI LU-P2_Cleaned_Version.json"


def main():
    with open(ROOT_PATH, "r") as jsonFile:
        content = json.loads(jsonFile.read())

        main_document = content["Data"]["Attributes"]["MainDocument"]
        file_path = main_document["FilePath"]
        JSON_CONTENT["FilePath"] = file_path

        revit_types = main_document["RevitTypes"]
        level_id_dict = get_level_id_list(revit_types)
        for revit_class in revit_types:
            get_project_info(revit_class)
            get_project_location_info(revit_class)
            get_level_info(revit_class)
            get_room_info(revit_class, level_id_dict)


def get_project_info(revit_class):
    project_parameter_list = [
        "Building_UUID",
        "TemplateVersion",
        "USFPerDesk_Project",
        "AverageOfficeDeskCount_Project",
        "PmrBranchId",
        "StargateID",
        "PmrRepositoryId",
    ]
    if revit_class["Name"] == "Autodesk.Revit.DB.ProjectInfo":
        elements = revit_class["Elements"][0]
        parameters = elements["Parameters"]
        JSON_CONTENT["ProjectInfo"]["RevitClassName"] = revit_class["Name"]
        JSON_CONTENT["ProjectInfo"]["Category"] = revit_class["Category"]
        JSON_CONTENT["ProjectInfo"]["Address"] = elements["Address"]
        JSON_CONTENT["ProjectInfo"]["ProjectName"] = elements["Name"]
        for param in parameters:
            if param["Name"] in project_parameter_list:
                JSON_CONTENT["ProjectInfo"][param["Name"]] = param["Value"]


def get_project_location_info(revit_class):
    if revit_class["Name"] == "Autodesk.Revit.DB.SiteLocation":
        JSON_CONTENT["ProjectLocation"]["RevitClassName"] = revit_class["Name"]
        JSON_CONTENT["ProjectLocation"]["Category"] = revit_class["Category"]
        elements = revit_class["Elements"][0]
        JSON_CONTENT["ProjectLocation"]["TimeZone"] = elements["TimeZone"]
        JSON_CONTENT["ProjectLocation"]["Longitude"] = elements["Longitude"]
        JSON_CONTENT["ProjectLocation"]["Latitude"] = elements["Latitude"]


def get_level_info(revit_class):
    level_parameter_list = [
        "LoungePercentOfUSF_Level",
        "GeometricLevel",
        "USF",
        "StargateFloorID",
        "RSF",
        "USFPerDesk_Level",
        "StargateFloorUuid",
        "WorkUnit_Level",
        "DeskCount_Level",
        "GSF",
        "AverageOfficeDeskCount_Level",
        "GeometricLevel",
    ]

    if revit_class["Name"] == "Autodesk.Revit.DB.Level":
        JSON_CONTENT["LevelInfo"]["RevitClassName"] = revit_class["Name"]
        JSON_CONTENT["LevelInfo"]["Category"] = revit_class["Category"]
        elements = revit_class["Elements"]
        if len(elements) > 0:
            JSON_CONTENT["LevelInfo"]["Levels"] = []
        for element in elements:
            level_info = {}
            parameters = element["Parameters"]
            level_info["Name"] = element["Name"]
            level_info["Elevation"] = element["Elevation"]
            level_info["Id"] = element["Id"]

            for param in parameters:
                if param["Name"] in level_parameter_list:
                    level_info[param["Name"]] = param["Value"]
            JSON_CONTENT["LevelInfo"]["Levels"].append(level_info)


def get_level_id_list(revit_types):
    level_id_dict = {}
    for revit_class in revit_types:
        if revit_class["Name"] == "Autodesk.Revit.DB.Level":
            elements = revit_class["Elements"]
            for element in elements:
                level_name = element["Name"]
                level_id = element["Id"]
                if level_name != "CONTAINER LEVEL":
                    level_id_dict[level_id] = level_name
    return level_id_dict


def get_room_info(revit_class, level_id_dict):
    room_parameter_list = [
        "PhysicalDeskCount_Room",
        "HasWindow",
        "Occupancy",
        "Name",
        "ProgramType",
        "DeskCount_Room",
        "PrecedentProgramPercentage",
        "Level",
        "ProgramOrder",
        "Number",
        "TotalOfficeNumberPercentage",
        "InternalRoomCount",
        "HasAV",
        "WorkUnit_Room",
    ]
    if revit_class["Name"] == "Autodesk.Revit.DB.Architecture.Room":
        JSON_CONTENT["RoomInfo"]["RevitClassName"] = revit_class["Name"]
        JSON_CONTENT["RoomInfo"]["Category"] = revit_class["Category"]
        elements = revit_class["Elements"]

        if len(level_id_dict.keys()) > 0:
            for level_id, level_name in level_id_dict.items():
                JSON_CONTENT["RoomInfo"][level_name] = []

        for element in elements:
            level_id = element["LevelId"]
            if level_id in level_id_dict.keys():
                room_info = {}
                room_info["Area"] = element["Area"]
                room_info["Number"] = element["Number"]
                parameters = element["Parameters"]
                for param in parameters:
                    if param["Name"] in room_parameter_list:
                        room_info[param["Name"]] = param["Value"]

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
                            first_point = str((first_x, first_y))
                            object_box.append(first_point)
                            second_x = tessellate[1]["X"]
                            second_y = tessellate[1]["Y"]
                            second_point = str((second_x, second_y))
                            object_box.append(second_point)
                        if i > 0:
                            point_x = tessellate[1]["X"]
                            point_y = tessellate[1]["Y"]
                            n_point = str((point_x, point_y))
                            object_box.append(n_point)
                    room_outline.append(object_box)
                room_info["outline"] = room_outline
                JSON_CONTENT["RoomInfo"][level_id_dict[level_id]].append(room_info)


if __name__ == "__main__":
    main()
    print(json.dumps(JSON_CONTENT, indent=4))
