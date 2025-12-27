from sqlalchemy import Column, Integer, String, DateTime, Boolean, Enum
from infrastructure.databases.base import Base
from domain.models.user import UserRole

class UserModel(Base):
    __tablename__ = 'bizflow_user'

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(50), nullable=False, unique=True)
    password = Column(String(255), nullable=False)
    role = Column(Enum(UserRole, values_callable=lambda x: [e.value for e in x]), nullable=False)
    business_id = Column(Integer, nullable=True)
    name = Column(String(100), nullable=True)
    phone = Column(String(20), nullable=True)
    email = Column(String(100), nullable=True)
    status = Column(Boolean, default=True)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
