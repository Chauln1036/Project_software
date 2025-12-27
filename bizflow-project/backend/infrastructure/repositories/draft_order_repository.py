from domain.models.draft_order import DraftOrder
from infrastructure.models.draft_order_model import DraftOrderModel
from infrastructure.databases.mysql import session
from typing import List, Optional
from datetime import datetime

class DraftOrderRepository:
    def __init__(self, session=session):
        self.session = session

    def add(self, draft_order: DraftOrder) -> DraftOrder:
        draft_order_model = DraftOrderModel(
            business_id=draft_order.business_id,
            customer_id=draft_order.customer_id,
            employee_id=draft_order.employee_id,
            total_amount=draft_order.total_amount,
            debt_amount=draft_order.debt_amount,
            status=draft_order.status,
            source=draft_order.source,
            raw_input=draft_order.raw_input,
            confidence=draft_order.confidence,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        self.session.add(draft_order_model)
        self.session.commit()
        self.session.refresh(draft_order_model)
        return self._model_to_domain(draft_order_model)

    def get_by_id(self, draft_order_id: int) -> Optional[DraftOrder]:
        draft_order_model = self.session.query(DraftOrderModel).filter_by(id=draft_order_id).first()
        return self._model_to_domain(draft_order_model) if draft_order_model else None

    def list(self) -> List[DraftOrder]:
        draft_order_models = self.session.query(DraftOrderModel).all()
        return [self._model_to_domain(model) for model in draft_order_models]

    def list_by_business(self, business_id: int) -> List[DraftOrder]:
        draft_order_models = self.session.query(DraftOrderModel).filter_by(business_id=business_id).all()
        return [self._model_to_domain(model) for model in draft_order_models]

    def update(self, draft_order: DraftOrder) -> DraftOrder:
        draft_order_model = self.session.query(DraftOrderModel).filter_by(id=draft_order.id).first()
        if draft_order_model:
            draft_order_model.business_id = draft_order.business_id
            draft_order_model.customer_id = draft_order.customer_id
            draft_order_model.employee_id = draft_order.employee_id
            draft_order_model.total_amount = draft_order.total_amount
            draft_order_model.debt_amount = draft_order.debt_amount
            draft_order_model.status = draft_order.status
            draft_order_model.source = draft_order.source
            draft_order_model.raw_input = draft_order.raw_input
            draft_order_model.confidence = draft_order.confidence
            draft_order_model.updated_at = datetime.now()
            self.session.commit()
        return self._model_to_domain(draft_order_model)

    def delete(self, draft_order_id: int) -> None:
        draft_order_model = self.session.query(DraftOrderModel).filter_by(id=draft_order_id).first()
        if draft_order_model:
            self.session.delete(draft_order_model)
            self.session.commit()

    def _model_to_domain(self, draft_order_model: DraftOrderModel) -> DraftOrder:
        # For draft orders, we need to reconstruct the items from the raw_input
        # This is simplified - in production you'd store draft order items separately
        from domain.models.order import OrderItem
        items = []  # Placeholder - you'd parse raw_input to create items

        return DraftOrder(
            id=draft_order_model.id,
            business_id=draft_order_model.business_id,
            customer_id=draft_order_model.customer_id,
            employee_id=draft_order_model.employee_id,
            items=items,
            total_amount=draft_order_model.total_amount,
            debt_amount=draft_order_model.debt_amount,
            status=draft_order_model.status,
            source=draft_order_model.source,
            raw_input=draft_order_model.raw_input,
            confidence=draft_order_model.confidence,
            created_at=draft_order_model.created_at.isoformat() if draft_order_model.created_at else None,
            updated_at=draft_order_model.updated_at.isoformat() if draft_order_model.updated_at else None
        )
