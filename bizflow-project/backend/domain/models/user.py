from enum import Enum

class UserRole(Enum):
    EMPLOYEE = "employee"
    OWNER = "owner"
    ADMIN = "admin"

class User:
    def __init__(self, id: int = None, username: str = None, password: str = None, role: UserRole = None, business_id: int = None, name: str = None, phone: str = None, email: str = None, status: bool = True, created_at: str = None, updated_at: str = None):
        self.id = id
        self.username = username
        self.password = password
        self.role = role
        self.business_id = business_id
        self.name = name
        self.phone = phone
        self.email = email
        self.status = status
        self.created_at = created_at
        self.updated_at = updated_at
