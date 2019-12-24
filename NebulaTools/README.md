# How to Use

## PMRAPIWrapper

1. Create wrapper object

    ```python
    wrapper = PMRAPIWrapper(pmr_repo_id)
    ```

2. Get repository id, commit id and blob id

    ```python
    wrapper.pmr_repo_id
    wrapper.commit_id
    wrapper.blob_id
    ```

3. Get blob raw json string

    ```python
    wrapper.get_blob()
    ```
