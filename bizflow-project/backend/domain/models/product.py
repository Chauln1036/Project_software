class Product:
    def __init__(self, id: int = None, business_id: int = None, name: str = None, description: str = None, price: float = None, unit: str = None, category: str = None, image_url: str = None, status: bool = True, created_at: str = None, updated_at: str = None):
        self.id = id
        self.business_id = business_id
        self.name = name
        self.description = description
        self.price = price
        self.unit = unit
        self.category = category
        self.image_url = image_url
        self.status = status
        self.created_at = created_at
        self.updated_at = updated_at
