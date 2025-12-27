class Inventory:
    def __init__(self, id: int = None, product_id: int = None, quantity: int = None, min_stock: int = 0, last_updated: str = None):
        self.id = id
        self.product_id = product_id
        self.quantity = quantity
        self.min_stock = min_stock
        self.last_updated = last_updated
