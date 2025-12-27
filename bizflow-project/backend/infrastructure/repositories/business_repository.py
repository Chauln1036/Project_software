from domain.models.business import Business
from infrastructure.models.business_model import BusinessModel
from infrastructure.databases.mssql import session
from typing import List, Optional

class BusinessRepository:
    def __init__(self, session=session):
        self.session = session

    def add(self, business: Business) -> Business:
        business_model = BusinessModel(
            name=business.name,
            owner_id=business.owner_id,
            address=business.address,
            phone=business.phone,
            email=business.email,
            tax_code=business.tax_code,
            status=business.status,
            created_at=business.created_at,
            updated_at=business.updated_at
        )
        self.session.add(business_model)
        self.session.commit()
        self.session.refresh(business_model)
        return self._model_to_domain(business_model)

    def get_by_id(self, business_id: int) -> Optional[Business]:
        business_model = self.session.query(BusinessModel).filter_by(id=business_id).first()
        return self._model_to_domain(business_model) if business_model else None

    def list(self) -> List[Business]:
        business_models = self.session.query(BusinessModel).all()
        return [self._model_to_domain(model) for model in business_models]

    def update(self, business: Business) -> Business:
        business_model = self.session.query(BusinessModel).filter_by(id=business.id).first()
        if business_model:
            business_model.name = business.name
            business_model.owner_id = business.owner_id
            business_model.address = business.address
            business_model.phone = business.phone
            business_model.email = business.email
            business_model.tax_code = business.tax_code
            business_model.status = business.status
            business_model.updated_at = business.updated_at
            self.session.commit()
        return self._model_to_domain(business_model)

    def delete(self, business_id: int) -> None:
        business_model = self.session.query(BusinessModel).filter_by(id=business_id).first()
        if business_model:
            self.session.delete(business_model)
            self.session.commit()

    def _model_to_domain(self, business_model: BusinessModel) -> Business:
        return Business(
            id=business_model.id,
            name=business_model.name,
            owner_id=business_model.owner_id,
            address=business_model.address,
            phone=business_model.phone,
            email=business_model.email,
            tax_code=business_model.tax_code,
            status=business_model.status,
            created_at=business_model.created_at.isoformat() if business_model.created_at else None,
            updated_at=business_model.updated_at.isoformat() if business_model.updated_at else None
        )
