import os
import posixpath
import requests
import sqlite3
import json


class PMRAPIWrapper:
    """
    Give a PMR_repo_uuid, return a formatted bolb json string.
    """

    _URL_END_POINT = "https://pmr.weworkers.io/api/v1/"
    _TOKEN = os.getenv("PMR_ACCESS_TOKEN")

    def __init__(self):
        self._header = {"Authorization": f"Bearer {self._TOKEN}"}

    @property
    def project_name(self):
        return self._project_name

    def get_blob(self, pmr_repo_id):

        commit_id = self.get_commit_id(pmr_repo_id)
        blob_id = self.get_blob_id(commit_id)

        url = posixpath.join(
            self._URL_END_POINT, "repositories", pmr_repo_id, "blobs", blob_id
        )
        headers = self._header
        headers["Accept"] = "application/json"

        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            blob = response.json()
            with open("./src/test.json", "w") as json_file:
                json.dump(response.json(), json_file, indent=4)

            return blob
        else:
            response.raise_for_status()

    def get_blob_id(self, commit_id):
        # "https://pmr.weworkers.io/api/v1/commits/{commit_uuid}"
        url = posixpath.join(self._URL_END_POINT, "commits", commit_id)
        headers = self._header
        payload = {"include": "blobs"}
        # get request
        response = requests.get(url, headers=headers, params=payload)
        if response.status_code == 200:  # if succeed
            blob_list: list = response.json()["included"]
            for blob in blob_list:
                if blob["attributes"]["name"] == "full_harvest":
                    return blob["id"]

            return None  # if there is no "full_harvest", return None

        else:
            response.raise_for_status()

    def get_commit_id(self, pmr_repo_id):
        """
        Return the commits id of the master branch of a project.
        If this project has not been harvested, return None.
        Else if http errors, raise the error.
        """
        # "https://pmr.weworkers.io/api/v1/repositories/{pmr_repo_uuid}"
        url = posixpath.join(self._URL_END_POINT, "repositories", pmr_repo_id)
        payload = {"include": "branches"}
        response = requests.get(url, headers=self._header, params=payload)

        if response.status_code == 200:  # if succeed
            result = response.json()
            includes = result["included"]

            project_name = result["data"]["attributes"]["name"]
            self._project_name = project_name

            if includes == 0:
                raise Exception("Get no branches from this project")
            for branch in includes:
                if branch["attributes"]["name"] == "master":  # look for master branches
                    try:
                        commit_id = branch["relationships"]["head"]["data"]["id"]
                        return commit_id
                    except KeyError:  # if no such a key, then it is not harvested yet
                        return None

        else:  # if the request not succeed
            response.raise_for_status()


def read_prject_ids():
    """read 'chinaprojects.sqlite' to
        get the all China region pmr_repo_id
        [pmr_repository_uuid, uuid, country]
        """
    conn = sqlite3.connect(r".\src\chinaprojects.sqlite")
    cur = conn.cursor()
    cur.execute(
        """
            SELECT * FROM China_project_IDs
            """
    )
    for row in cur:
        result = row
        yield result[0]
    conn.close()


if __name__ == "__main__":

    pmr_repo_id_list = read_prject_ids()
    for repo_id in pmr_repo_id_list:
        print(f"Getting info of {repo_id}.............", end="")
        reader = PMRAPIWrapper()
        if reader.get_commit_id(repo_id) is not None:
            with open("./src/test.txt", "a") as file:
                print(f"get {reader.project_name}:{repo_id}")
                file.write(f"{repo_id}\n")
        else:
            print("has not been harvested yet!")
