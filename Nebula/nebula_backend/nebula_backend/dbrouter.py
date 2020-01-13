from nebula_backend.settings import DATABASE_APP_MAPPING


class DatabaseAppsRouter:
    def db_for_read(self, model, **hints):
        print(model._meta.app_label)
        return DATABASE_APP_MAPPING.get(model._meta.app_label, None)

    def db_for_write(self, model, **hints):
        """
        Attempts to write auth and contenttypes models go to auth_db.
        """
        return DATABASE_APP_MAPPING.get(model._meta.app_label, None)

    def allow_relation(self, obj1, obj2, **hints):
        """
        Allow relations if a model in the auth or contenttypes apps is
        involved.
        """
        is_obj1 = DATABASE_APP_MAPPING.get(obj1._meta.app_label, None)
        is_obj2 = DATABASE_APP_MAPPING.get(obj2._meta.app_label, None)
        if is_obj1 and is_obj2:
            if is_obj1 == is_obj2:
                return True
            else:
                return False
        else:
            return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """
        Make sure the auth and contenttypes apps only appear in the
        'auth_db' database.
        """
        if db in DATABASE_APP_MAPPING.values():
            return DATABASE_APP_MAPPING.get(app_label) == db
        elif app_label in DATABASE_APP_MAPPING:
            return False
        return None

