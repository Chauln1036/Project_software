from sqlalchemy import Column, Integer, Float, String, DateTime
from infrastructure.databases.base import Base

class DraftOrderModel(Base):
    __tablename__ = 'bizflow_draft_order'

    id = Column(Integer, primary_key=True, autoincrement=True)
    business_id = Column(Integer, nullable=False)
    customer_id = Column(Integer, nullable=True)
    employee_id = Column(Integer, nullable=True)
    total_amount = Column(Float, nullable=True)
    debt_amount = Column(Float, default=0.0)
    status = Column(String(20), default='draft')
    source = Column(String(20), default='ai')
    raw_input = Column(String(500), nullable=True)
    confidence = Column(Float, nullable=True)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
