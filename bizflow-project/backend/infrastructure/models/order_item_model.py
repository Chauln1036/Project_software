from sqlalchemy import Column, Integer, Float
from infrastructure.databases.base import Base

class OrderItemModel(Base):
    __tablename__ = 'bizflow_order_item'

    id = Column(Integer, primary_key=True, autoincrement=True)
    order_id = Column(Integer, nullable=False)
    product_id = Column(Integer, nullable=False)
    quantity = Column(Integer, nullable=False)
    price = Column(Float, nullable=False)
    total = Column(Float, nullable=False)
