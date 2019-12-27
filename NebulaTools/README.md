# How to Use

## PMRAPIWrapper

1. Import the module

    ```python
    from utils.PMRAPIWrapper import PMRAPIWrapper
    ```

2. Create wrapper object

    ```python
    wrapper = PMRAPIWrapper(pmr_repo_id)
    ```

3. Get repository id, commit id and blob id

    ```python
    wrapper.pmr_repo_id
    wrapper.commit_id
    wrapper.blob_id
    ```

4. Get blob raw json string

    ```python
    json_str = wrapper.get_blob()
    ```

---
## HarvestedChecker

Run in proper Python environment 
>python HarvestChecker.py

It create a `chinaproject.txt` file in ./data/

---