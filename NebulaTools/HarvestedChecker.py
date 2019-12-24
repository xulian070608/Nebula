from utils.PMRAPIWrapper import PMRAPIWrapper
from utils.cn_repo_uuid_fetcher import get_china_pmr_id_list

id_generator = get_china_pmr_id_list(r"data\chinaprojects.sqlite")
count = 1
txt_file = open(r"data\chinaproject.txt", "a")
for repo_id in id_generator:
    print(f"[{count}]Checking {repo_id}", end=" ")
    count += 1
    wrapper = PMRAPIWrapper(repo_id)
    if wrapper.blob_id:
        print(f"is harvested, blob is is {wrapper.blob_id}")
        txt_file.write(wrapper.blob_id)
        txt_file.write("\n")
    else:
        print("has NOT HARVESTED!!")
txt_file.close()

