from domain.models.inventory import Inventory
from infrastructure.models.inventory_model import InventoryModel
from infrastructure.databases.mysql import session
from typing import List, Optional

class InventoryRepository:
    def __init__(self, session=session):
        self.session = session

    def add(self, inventory: Inventory) -> Inventory:
        inventory_model = InventoryModel(
            product_id=inventory.product_id,
            quantity=inventory.quantity,
            min_stock=inventory.min_stock,
            last_updated=inventory.last_updated
        )
        self.session.add(inventory_model)
        self.session.commit()
        self.session.refresh(inventory_model)
        return self._model_to_domain(inventory_model)

    def get_by_id(self, inventory_id: int) -> Optional[Inventory]:
        inventory_model = self.session.query(InventoryModel).filter_by(id=inventory_id).first()
        return self._model_to_domain(inventory_model) if inventory_model else None

    def get_by_product(self, product_id: int) -> Optional[Inventory]:
        inventory_model = self.session.query(InventoryModel).filter_by(product_id=product_id).first()
        return self._model_to_domain(inventory_model) if inventory_model else None

    def list(self) -> List[Inventory]:
        inventory_models = self.session.query(InventoryModel).all()
        return [self._model_to_domain(model) for model in inventory_models]

    def update(self, inventory: Inventory) -> Inventory:
        inventory_model = self.session.query(InventoryModel).filter_by(id=inventory.id).first()
        if inventory_model:
            inventory_model.product_id = inventory.product_id
            inventory_model.quantity = inventory.quantity
            inventory_model.min_stock = inventory.min_stock
            inventory_model.last_updated = inventory.last_updated
            self.session.commit()
        return self._model_to_domain(inventory_model)

    def delete(self, inventory_id: int) -> None:
        inventory_model = self.session.query(InventoryModel).filter_by(id=inventory_id).first()
        if inventory_model:
            self.session.delete(inventory_model)
            self.session.commit()

    def _model_to_domain(self, inventory_model: InventoryModel) -> Inventory:
        return Inventory(
            id=inventory_model.id,
            product_id=inventory_model.product_id,
            quantity=inventory_model.quantity,
            min_stock=inventory_model.min_stock,
            last_updated=inventory_model.last_updated.isoformat() if inventory_model.last_updated else None
        )
