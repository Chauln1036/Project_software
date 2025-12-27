from typing import List
from .order import OrderItem

class DraftOrder:
    def __init__(self, id: int = None, business_id: int = None, customer_id: int = None, employee_id: int = None, items: List[OrderItem] = None, total_amount: float = None, debt_amount: float = None, status: str = "draft", source: str = "ai", raw_input: str = None, confidence: float = None, created_at: str = None, updated_at: str = None):
        self.id = id
        self.business_id = business_id
        self.customer_id = customer_id
        self.employee_id = employee_id
        self.items = items or []
        self.total_amount = total_amount
        self.debt_amount = debt_amount
        self.status = status
        self.source = source
        self.raw_input = raw_input
        self.confidence = confidence
        self.created_at = created_at
        self.updated_at = updated_at
