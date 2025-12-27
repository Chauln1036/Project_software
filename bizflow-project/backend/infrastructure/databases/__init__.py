from config import Config
from infrastructure.models import user_model, business_model, product_model, inventory_model, customer_model, order_model, order_item_model, draft_order_model

def init_db(app):
    db_uri = Config.DATABASE_URI.lower()
    if 'mssql' in db_uri:
        from infrastructure.databases.mssql import init_mssql
        init_mssql(app)
    elif 'mysql' in db_uri:
        from infrastructure.databases.mysql import init_mysql
        init_mysql(app)
    elif 'postgres' in db_uri:
        from infrastructure.databases.postgres import init_postgres
        init_postgres(app)
    else:
        # Default to MySQL
        from infrastructure.databases.mysql import init_mysql
        init_mysql(app)

# Import session after init_db is called
def get_session():
    from flask import current_app
    db_uri = Config.DATABASE_URI.lower()
    if 'mssql' in db_uri:
        from infrastructure.databases.mssql import session as mssql_session
        return mssql_session
    elif 'mysql' in db_uri:
        from infrastructure.databases.mysql import session as mysql_session
        return mysql_session
    elif 'postgres' in db_uri:
        from infrastructure.databases.postgres import session as postgres_session
        return postgres_session
    else:
        from infrastructure.databases.mysql import session as mysql_session
        return mysql_session

# For backward compatibility, try to get session
session = None
try:
    session = get_session()
except:
    pass

from infrastructure.databases.mysql import Base
