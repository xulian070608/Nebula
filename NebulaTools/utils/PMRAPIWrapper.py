import os
import posixpath
import requests


class PMRAPIWrapper:
    """
    Give a PMR_repo_uuid, return a formatted bolb json string.
    """

    _URL_END_POINT = "https://pmr.weworkers.io/api/v1/"
    _TOKEN = os.getenv("PMR_ACCESS_TOKEN")
    print(_TOKEN)

    def __init__(self, pmr_repo_id: str):
        self._header = {"Authorization": f"Bearer {self._TOKEN}"}
        #
        self._pmr_repo_id = pmr_repo_id

        self._commit_id = self._get_commit_id()

        if self.commit_id is not None:
            self._blob_id = self._get_blob_id()  # try to get "full-harvest" bolb id
        else:
            self._blob_id = None  # if no commit, blob id is None

    @property
    def commit_id(self):
        return self._commit_id

    @property
    def blob_id(self):
        return self._blob_id

    @property
    def pmr_repo_id(self):
        return self._pmr_repo_id

    @property
    def project_name(self):
        return self._project_name

    def _get_commit_id(self):
        """Get the commits from given pmr_repo_id
        """
        url = posixpath.join(self._URL_END_POINT, "repositories", self.pmr_repo_id)
        payload = {"include": "branches"}
        response = requests.get(url, headers=self._header, params=payload)

        if response.status_code == 200:  # if request succeed
            result = response.json()
            includes = result["included"]
            self._project_name = result["data"]["attributes"]["name"]

            if includes == 0:
                return None  # if the length of includes is 0. There is no branches.
            else:
                for branch in includes:
                    if (
                        branch["attributes"]["name"] == "master"
                    ):  # look for master branches
                        try:
                            commit_id = branch["relationships"]["head"]["data"]["id"]
                            return commit_id
                        except KeyError:
                            # print(f"{project_name} has not harvested!")
                            return None
                return None
        else:
            response.raise_for_status()

    def _get_blob_id(self):

        url = posixpath.join(self._URL_END_POINT, "commits", self.commit_id)
        headers = self._header
        payload = {"include": "blobs"}
        response = requests.get(url, headers=headers, params=payload)

        if response.status_code == 200:
            blob_list: list = response.json()["included"]
            if len(blob_list) == 0:
                return None
            else:
                for blob in blob_list:
                    if blob["attributes"]["name"] == "full_harvest":
                        return blob["id"]
        else:
            response.raise_for_status()

    def get_blob(self):

        url = posixpath.join(
            self._URL_END_POINT, "repositories", self.pmr_repo_id, "blobs", self.blob_id
        )

        headers = self._header
        headers["Accept"] = "application/json"

        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            blob = response.json()
            return blob
        else:
            response.raise_for_status()


if __name__ == "__main__":
    wrapper = PMRAPIWrapper("e86b9743-69ae-41a8-8e2c-2bf219ad4864")
    json_str = wrapper.get_blob()
    print(json_str)
