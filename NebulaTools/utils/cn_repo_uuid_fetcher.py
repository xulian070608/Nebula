import sqlite3


def get_china_pmr_id_list(path):
    conn = sqlite3.connect(path)
    cur = conn.cursor()
    cur.execute("SELECT pmr_repository_uuid FROM China_project_IDs")
    while True:
        result = cur.fetchone()  # get next line of the records
        if result:
            yield result[0]
        else:
            break


if __name__ == "__main__":
    id_generator = get_china_pmr_id_list("data\chinaprojects.sqlite")
    for i in id_generator:
        print(i)
