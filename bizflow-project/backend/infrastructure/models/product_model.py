from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean
from infrastructure.databases.base import Base

class ProductModel(Base):
    __tablename__ = 'bizflow_product'

    id = Column(Integer, primary_key=True, autoincrement=True)
    business_id = Column(Integer, nullable=False)
    name = Column(String(100), nullable=False)
    description = Column(String(255), nullable=True)
    price = Column(Float, nullable=False)
    unit = Column(String(20), nullable=True)
    category = Column(String(50), nullable=True)
    image_url = Column(String(255), nullable=True)
    status = Column(Boolean, default=True)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
