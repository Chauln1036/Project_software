from sqlalchemy import Column, Integer, DateTime
from infrastructure.databases.base import Base

class InventoryModel(Base):
    __tablename__ = 'bizflow_inventory'

    id = Column(Integer, primary_key=True, autoincrement=True)
    product_id = Column(Integer, nullable=False)
    quantity = Column(Integer, nullable=False, default=0)
    min_stock = Column(Integer, default=0)
    last_updated = Column(DateTime)
