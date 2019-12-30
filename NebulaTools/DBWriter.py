import psycopg2
from utils.database.PSQLConnector import config
from utils.PMRDeserializer import PMRDeserializer
import os


def get_json_file_list():
    f = []
    for _, _, files in os.walk("data"):
        for file_name in files:
            _, extension_name = os.path.splitext(file_name)
            if extension_name == ".json":
                f.append("data/" + file_name)
    print(f)
    return f


def read_json(json_path):
    for path in json_path:
        with open(json_path) as json_data:
            yield json_data

def insert_project_info(json)

def project():
    deserializer = PMRDeserializer
    PMRDeserializer.get_project_info()


def main():
    params = config()

    conn = psycopg2.connect(**params)
    cur = conn.cursor()

    sql = """
    """

    cur.execute(sql)
    #  commit changes
    conn.commit()

    # end session
    cur.close()
    conn.close()
    pass


if __name__ == "__main__":
    get_json_file()
