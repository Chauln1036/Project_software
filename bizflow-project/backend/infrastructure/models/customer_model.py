from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean
from infrastructure.databases.base import Base

class CustomerModel(Base):
    __tablename__ = 'bizflow_customer'

    id = Column(Integer, primary_key=True, autoincrement=True)
    business_id = Column(Integer, nullable=False)
    name = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=True)
    address = Column(String(255), nullable=True)
    email = Column(String(100), nullable=True)
    total_debt = Column(Float, default=0.0)
    status = Column(Boolean, default=True)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
