import psycopg2
import json
from utils.database.PSQLConnector import config

# from utils.PMRDeserializer import PMRDeserializer
import os


class DBWriter:
    def __init__(self):
        pass

    def get_json_file_list(self):
        f = []
        for _, _, files in os.walk("data"):
            for file_name in files:
                _, extension_name = os.path.splitext(file_name)
                if extension_name == ".json":
                    f.append("data/" + file_name)
        # print(f)
        return f

    def read_json(json_path):
        with open(json_path) as json_file:
            json_data = json.load(json_file)
        return json_data

    def insert_project_info(json_data):
        pass

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
    pass
