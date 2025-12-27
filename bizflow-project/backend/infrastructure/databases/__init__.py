from config import Config
from infrastructure.models import user_model, business_model, product_model, inventory_model, customer_model, order_model, order_item_model, draft_order_model

def init_db(app):
    from infrastructure.databases.mysql import init_mysql
    init_mysql(app)

# Import session after init_db is called
def get_session():
    from infrastructure.databases.mysql import session as mysql_session
    return mysql_session

# For backward compatibility, try to get session
session = None
try:
    session = get_session()
except:
    pass

from infrastructure.databases.base import Base
