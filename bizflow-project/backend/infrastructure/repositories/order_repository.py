from domain.models.order import Order, OrderItem
from infrastructure.models.order_model import OrderModel
from infrastructure.models.order_item_model import OrderItemModel
from infrastructure.databases.mysql import session
from typing import List, Optional
from datetime import datetime

class OrderRepository:
    def __init__(self, session=session):
        self.session = session

    def add(self, order: Order) -> Order:
        # Create order first
        order_model = OrderModel(
            business_id=order.business_id,
            customer_id=order.customer_id,
            employee_id=order.employee_id,
            total_amount=order.total_amount,
            debt_amount=order.debt_amount,
            status=order.status,
            payment_method=order.payment_method,
            notes=order.notes,
            created_at=datetime.now() if order.created_at else datetime.now(),
            updated_at=datetime.now()
        )
        self.session.add(order_model)
        self.session.commit()
        self.session.refresh(order_model)

        # Create order items
        order_items = []
        for item in order.items:
            item_model = OrderItemModel(
                order_id=order_model.id,
                product_id=item.product_id,
                quantity=item.quantity,
                price=item.price,
                total=item.total
            )
            self.session.add(item_model)
            order_items.append(item_model)

        self.session.commit()

        # Convert back to domain model
        return self._model_to_domain(order_model, order_items)

    def get_by_id(self, order_id: int) -> Optional[Order]:
        order_model = self.session.query(OrderModel).filter_by(id=order_id).first()
        if not order_model:
            return None

        order_items = self.session.query(OrderItemModel).filter_by(order_id=order_id).all()
        return self._model_to_domain(order_model, order_items)

    def list(self) -> List[Order]:
        order_models = self.session.query(OrderModel).all()
        orders = []
        for order_model in order_models:
            order_items = self.session.query(OrderItemModel).filter_by(order_id=order_model.id).all()
            orders.append(self._model_to_domain(order_model, order_items))
        return orders

    def list_by_business(self, business_id: int) -> List[Order]:
        order_models = self.session.query(OrderModel).filter_by(business_id=business_id).all()
        orders = []
        for order_model in order_models:
            order_items = self.session.query(OrderItemModel).filter_by(order_id=order_model.id).all()
            orders.append(self._model_to_domain(order_model, order_items))
        return orders

    def update(self, order: Order) -> Order:
        order_model = self.session.query(OrderModel).filter_by(id=order.id).first()
        if order_model:
            order_model.business_id = order.business_id
            order_model.customer_id = order.customer_id
            order_model.employee_id = order.employee_id
            order_model.total_amount = order.total_amount
            order_model.debt_amount = order.debt_amount
            order_model.status = order.status
            order_model.payment_method = order.payment_method
            order_model.notes = order.notes
            order_model.updated_at = datetime.now()
            self.session.commit()

            # Update order items (simplified - in production you'd handle this properly)
            order_items = self.session.query(OrderItemModel).filter_by(order_id=order.id).all()
            return self._model_to_domain(order_model, order_items)
        return order

    def delete(self, order_id: int) -> None:
        # Delete order items first
        self.session.query(OrderItemModel).filter_by(order_id=order_id).delete()

        # Delete order
        order_model = self.session.query(OrderModel).filter_by(id=order_id).first()
        if order_model:
            self.session.delete(order_model)
            self.session.commit()

    def _model_to_domain(self, order_model: OrderModel, order_item_models: List[OrderItemModel]) -> Order:
        order_items = []
        for item_model in order_item_models:
            item = OrderItem(
                id=item_model.id,
                product_id=item_model.product_id,
                quantity=item_model.quantity,
                price=item_model.price,
                total=item_model.total
            )
            order_items.append(item)

        return Order(
            id=order_model.id,
            business_id=order_model.business_id,
            customer_id=order_model.customer_id,
            employee_id=order_model.employee_id,
            items=order_items,
            total_amount=order_model.total_amount,
            debt_amount=order_model.debt_amount,
            status=order_model.status,
            payment_method=order_model.payment_method,
            notes=order_model.notes,
            created_at=order_model.created_at.isoformat() if order_model.created_at else None,
            updated_at=order_model.updated_at.isoformat() if order_model.updated_at else None
        )
