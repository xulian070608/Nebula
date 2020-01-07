from .database.PSQLConnector import config
import psycopg2


class DBWrite:
    def __init__(self):
        self.conn, self.cur = self.db_connection()
        pass

    def db_connection(self):
        params = config()
        print("Connecting to NebulaDB...")
        try:
            conn = psycopg2.connect(**params)
            print("Success!")
            cur = conn.cursor()
            cur.execute("SELECT Version();")
            print(cur.fetchone())
            return conn, cur
        except psycopg2.Error as e:
            print(e)

    def insert_project(self, project_info):
        fields = ", ".join(project_info.keys())
        values = tuple(project_info[key] for key in project_info)
        building_uuid = project_info["building_uuid"]
        print(
            f"{'Inserting:':<20} {project_info['project_name']:^20} {building_uuid:>20}",
            end="",
        )
        my_sql = f"""
            INSERT INTO nebula_ww_china_projects.project_info
            ({fields})
            VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
            """
        try:
            self.cur.execute(my_sql, values)
            self.conn.commit()
            print(f"{'....[DONE!]':>20}")
        except psycopg2.Error as e:
            print(f"{'....[FAILED!]':>20}", end=" ")
            print(f"Error Code: {e.pgcode}")
            self.conn.rollback()
        finally:
            return building_uuid

    def insert_level(self, level_list):
        values = [tuple(lvl.values()) for lvl in level_list]
        values = list(values)
        fields = ", ".join(level_list[0].keys())
        print(
            f"{'Inserting:':<20} {'levels':^20}", end="",
        )

        sql = f"""
            INSERT INTO nebula_ww_china_projects.level
            ({fields})
            VALUES({r'%s, '*(len(values[0])-1)}%s)
            """
        try:
            self.cur.executemany(sql, values)
            self.conn.commit()
            print(f"{'....[DONE!]':>20}")
        except psycopg2.Error as e:
            print(f"{'....[FAILED!]':>20}", end=" ")
            print(f"Error Code: {e.pgcode}")
            self.conn.rollback()

    def insert_room(self, room_list):

        fields = ", ".join(room_list[0].keys())
        values = [tuple(room.values()) for room in room_list]
        values = list(values)

        print(
            f"{'Inserting:':<20} {'rooms':^20}", end="",
        )

        sql = f"""
            INSERT INTO nebula_ww_china_projects.room
            ({fields})
            VALUES({r'%s, '*(len(values[0])-1)}%s)
            """
        try:
            self.cur.executemany(sql, values)
            self.conn.commit()
            print(f"{'....[DONE!]':>20}")
        except psycopg2.Error as e:
            print(f"{'....[FAILED!]':>20}", end=" ")
            # print(f"Error Code: {e.pgcode}")
            print(e)
            self.conn.rollback()
        pass

    def insert_ws(self):
        pass

    def insert_loose_furniture(self):
        pass

    def close(self):
        return self.cur.close(), self.conn.close()
