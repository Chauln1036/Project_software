from infrastructure.databases import init_db
from flask import Flask
from infrastructure.models.user_model import UserModel
from infrastructure.models.business_model import BusinessModel
from domain.models.user import UserRole
import bcrypt
from datetime import datetime

app = Flask(__name__)
init_db(app)

from infrastructure.databases.mssql import session

# Check if owner exists
owner = session.query(UserModel).filter_by(username="owner").first()
if not owner:
    hashed_password = bcrypt.hashpw("password123".encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    owner = UserModel(
        username="owner",
        password=hashed_password,
        role=UserRole.OWNER,
        business_id=1,  # temporary
        name="Nguyễn Văn A",
        phone="0123456789",
        email="owner@abc.com",
        status=True,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    session.add(owner)
    session.commit()

# Create business
business = BusinessModel(
    name="Cửa hàng vật liệu xây dựng ABC",
    owner_id=owner.id,
    phone="0123456789",
    address="123 Đường ABC, Quận 1, TP.HCM",
    email="business@abc.com",
    tax_code="1234567890",
    status=True,
    created_at=datetime.now(),
    updated_at=datetime.now()
)
session.add(business)
session.commit()

# Update owner with business_id
owner.business_id = business.id
session.commit()

# Create employee user
employee = UserModel(
    username="employee",
    password=hashed_password,
    role=UserRole.EMPLOYEE,
    business_id=business.id,
    name="Trần Thị B",
    phone="0987654321",
    email="employee@abc.com",
    status=True,
    created_at=datetime.now(),
    updated_at=datetime.now()
)

session.add(employee)
session.commit()

print("Seed data created!")
print(f"Business ID: {business.id}")
print("Owner login: owner / password123")
print("Employee login: employee / password123")
