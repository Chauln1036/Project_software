from sqlalchemy import Column, Integer, String, DateTime, Boolean
from infrastructure.databases.base import Base

class BusinessModel(Base):
    __tablename__ = 'bizflow_business'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    owner_id = Column(Integer, nullable=False)
    address = Column(String(255), nullable=True)
    phone = Column(String(20), nullable=True)
    email = Column(String(100), nullable=True)
    tax_code = Column(String(50), nullable=True)
    status = Column(Boolean, default=True)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
