class Customer:
    def __init__(self, id: int = None, business_id: int = None, name: str = None, phone: str = None, address: str = None, email: str = None, total_debt: float = 0.0, status: bool = True, created_at: str = None, updated_at: str = None):
        self.id = id
        self.business_id = business_id
        self.name = name
        self.phone = phone
        self.address = address
        self.email = email
        self.total_debt = total_debt
        self.status = status
        self.created_at = created_at
        self.updated_at = updated_at
