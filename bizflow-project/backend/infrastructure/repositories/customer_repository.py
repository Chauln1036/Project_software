from domain.models.customer import Customer
from infrastructure.models.customer_model import CustomerModel
from infrastructure.databases.mssql import session
from typing import List, Optional

class CustomerRepository:
    def __init__(self, session=session):
        self.session = session

    def add(self, customer: Customer) -> Customer:
        customer_model = CustomerModel(
            business_id=customer.business_id,
            name=customer.name,
            phone=customer.phone,
            address=customer.address,
            email=customer.email,
            total_debt=customer.total_debt,
            status=customer.status,
            created_at=customer.created_at,
            updated_at=customer.updated_at
        )
        self.session.add(customer_model)
        self.session.commit()
        self.session.refresh(customer_model)
        return self._model_to_domain(customer_model)

    def get_by_id(self, customer_id: int) -> Optional[Customer]:
        customer_model = self.session.query(CustomerModel).filter_by(id=customer_id).first()
        return self._model_to_domain(customer_model) if customer_model else None

    def list(self) -> List[Customer]:
        customer_models = self.session.query(CustomerModel).all()
        return [self._model_to_domain(model) for model in customer_models]

    def list_by_business(self, business_id: int) -> List[Customer]:
        customer_models = self.session.query(CustomerModel).filter_by(business_id=business_id).all()
        return [self._model_to_domain(model) for model in customer_models]

    def update(self, customer: Customer) -> Customer:
        customer_model = self.session.query(CustomerModel).filter_by(id=customer.id).first()
        if customer_model:
            customer_model.business_id = customer.business_id
            customer_model.name = customer.name
            customer_model.phone = customer.phone
            customer_model.address = customer.address
            customer_model.email = customer.email
            customer_model.total_debt = customer.total_debt
            customer_model.status = customer.status
            customer_model.updated_at = customer.updated_at
            self.session.commit()
        return self._model_to_domain(customer_model)

    def delete(self, customer_id: int) -> None:
        customer_model = self.session.query(CustomerModel).filter_by(id=customer_id).first()
        if customer_model:
            self.session.delete(customer_model)
            self.session.commit()

    def _model_to_domain(self, customer_model: CustomerModel) -> Customer:
        return Customer(
            id=customer_model.id,
            business_id=customer_model.business_id,
            name=customer_model.name,
            phone=customer_model.phone,
            address=customer_model.address,
            email=customer_model.email,
            total_debt=customer_model.total_debt,
            status=customer_model.status,
            created_at=customer_model.created_at.isoformat() if customer_model.created_at else None,
            updated_at=customer_model.updated_at.isoformat() if customer_model.updated_at else None
        )
