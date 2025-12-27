from domain.models.product import Product
from infrastructure.models.product_model import ProductModel
from infrastructure.databases.mssql import session
from typing import List, Optional

class ProductRepository:
    def __init__(self, session=session):
        self.session = session

    def add(self, product: Product) -> Product:
        product_model = ProductModel(
            business_id=product.business_id,
            name=product.name,
            description=product.description,
            price=product.price,
            unit=product.unit,
            category=product.category,
            image_url=product.image_url,
            status=product.status,
            created_at=product.created_at,
            updated_at=product.updated_at
        )
        self.session.add(product_model)
        self.session.commit()
        self.session.refresh(product_model)
        return self._model_to_domain(product_model)

    def get_by_id(self, product_id: int) -> Optional[Product]:
        product_model = self.session.query(ProductModel).filter_by(id=product_id).first()
        return self._model_to_domain(product_model) if product_model else None

    def list(self) -> List[Product]:
        product_models = self.session.query(ProductModel).all()
        return [self._model_to_domain(model) for model in product_models]

    def list_by_business(self, business_id: int) -> List[Product]:
        product_models = self.session.query(ProductModel).filter_by(business_id=business_id).all()
        return [self._model_to_domain(model) for model in product_models]

    def update(self, product: Product) -> Product:
        product_model = self.session.query(ProductModel).filter_by(id=product.id).first()
        if product_model:
            product_model.business_id = product.business_id
            product_model.name = product.name
            product_model.description = product.description
            product_model.price = product.price
            product_model.unit = product.unit
            product_model.category = product.category
            product_model.image_url = product.image_url
            product_model.status = product.status
            product_model.updated_at = product.updated_at
            self.session.commit()
        return self._model_to_domain(product_model)

    def delete(self, product_id: int) -> None:
        product_model = self.session.query(ProductModel).filter_by(id=product_id).first()
        if product_model:
            self.session.delete(product_model)
            self.session.commit()

    def _model_to_domain(self, product_model: ProductModel) -> Product:
        return Product(
            id=product_model.id,
            business_id=product_model.business_id,
            name=product_model.name,
            description=product_model.description,
            price=product_model.price,
            unit=product_model.unit,
            category=product_model.category,
            image_url=product_model.image_url,
            status=product_model.status,
            created_at=product_model.created_at.isoformat() if product_model.created_at else None,
            updated_at=product_model.updated_at.isoformat() if product_model.updated_at else None
        )
