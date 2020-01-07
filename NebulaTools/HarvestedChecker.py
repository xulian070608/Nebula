"""
This script is used to check if the project is harvested or not by the new harvester.
"""

from utils.PMRAPIWrapper import PMRAPIWrapper
from utils.cn_repo_uuid_fetcher import get_china_pmr_id_list
import json
from time import sleep


id_generator = get_china_pmr_id_list(r"data\chinaprojects.sqlite")
count = 1
txt_file = open(r"data\chinaproject.txt", "w")

for repo_id in id_generator:
    print(f"[{count}]Checking {repo_id}", end=" ")
    count += 1
    wrapper = PMRAPIWrapper(repo_id)
    if wrapper.blob_id:
        print(f"is harvested, downloading {wrapper.project_name}.json")
        txt_file.write(repo_id)
        txt_file.write("\n")

        with open(f"data\{wrapper.project_name}.json", "w") as json_file:
            blob = wrapper.get_blob()
            json.dump(blob, json_file)
            json_file.close()

        sleep(2)
    else:
        print("has NOT HARVESTED!!")

txt_file.close()  # close file when finished.
