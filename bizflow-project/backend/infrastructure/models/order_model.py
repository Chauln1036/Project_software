from sqlalchemy import Column, Integer, Float, String, DateTime
from infrastructure.databases.base import Base

class OrderModel(Base):
    __tablename__ = 'bizflow_order'

    id = Column(Integer, primary_key=True, autoincrement=True)
    business_id = Column(Integer, nullable=False)
    customer_id = Column(Integer, nullable=True)
    employee_id = Column(Integer, nullable=False)
    total_amount = Column(Float, nullable=False)
    debt_amount = Column(Float, default=0.0)
    status = Column(String(20), default='pending')
    payment_method = Column(String(50), nullable=True)
    notes = Column(String(255), nullable=True)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
