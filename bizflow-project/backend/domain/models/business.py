class Business:
    def __init__(self, id: int = None, name: str = None, owner_id: int = None, address: str = None, phone: str = None, email: str = None, tax_code: str = None, status: bool = True, created_at: str = None, updated_at: str = None):
        self.id = id
        self.name = name
        self.owner_id = owner_id
        self.address = address
        self.phone = phone
        self.email = email
        self.tax_code = tax_code
        self.status = status
        self.created_at = created_at
        self.updated_at = updated_at
