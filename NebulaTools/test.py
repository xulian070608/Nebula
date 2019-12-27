from utils.PMRAPIWrapper import PMRAPIWrapper

wrapper = PMRAPIWrapper("6aca91fe-843f-4285-b677-59b4340be6d8")

print(wrapper.blob_id)
print(wrapper.get_blob())