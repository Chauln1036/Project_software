from domain.models.iuser_repository import IUserRepository
from domain.models.user import User
from typing import List, Optional
from sqlalchemy.orm import Session
from infrastructure.models.user_model import UserModel
from infrastructure.databases.mysql import session
from datetime import datetime

class UserRepository(IUserRepository):
    def __init__(self, session: Session = session):
        self.session = session

    def add(self, user: User) -> User:
        try:
            user_model = UserModel(
                username=user.username,
                password=user.password,
                role=user.role,
                business_id=user.business_id,
                name=user.name,
                phone=user.phone,
                email=user.email,
                status=user.status,
                created_at=datetime.now(),
                updated_at=datetime.now()
            )
            self.session.add(user_model)
            self.session.commit()
            self.session.refresh(user_model)
            return self._model_to_domain(user_model)
        except Exception as e:
            self.session.rollback()
            raise ValueError(f'User creation failed: {str(e)}')
        finally:
            self.session.close()

    def get_by_id(self, user_id: int) -> Optional[User]:
        user_model = self.session.query(UserModel).filter_by(id=user_id).first()
        return self._model_to_domain(user_model) if user_model else None

    def get_by_username(self, username: str) -> Optional[User]:
        user_model = self.session.query(UserModel).filter_by(username=username).first()
        return self._model_to_domain(user_model) if user_model else None

    def list(self) -> List[User]:
        user_models = self.session.query(UserModel).all()
        return [self._model_to_domain(model) for model in user_models]

    def update(self, user: User) -> User:
        try:
            user_model = self.session.query(UserModel).filter_by(id=user.id).first()
            if not user_model:
                raise ValueError('User not found')
            user_model.username = user.username
            user_model.password = user.password
            user_model.role = user.role
            user_model.business_id = user.business_id
            user_model.name = user.name
            user_model.phone = user.phone
            user_model.email = user.email
            user_model.status = user.status
            user_model.updated_at = datetime.now()
            self.session.commit()
            return self._model_to_domain(user_model)
        except Exception as e:
            self.session.rollback()
            raise ValueError(f'User update failed: {str(e)}')
        finally:
            self.session.close()

    def delete(self, user_id: int) -> None:
        try:
            user_model = self.session.query(UserModel).filter_by(id=user_id).first()
            if user_model:
                self.session.delete(user_model)
                self.session.commit()
            else:
                raise ValueError('User not found')
        except Exception as e:
            self.session.rollback()
            raise ValueError(f'User deletion failed: {str(e)}')
        finally:
            self.session.close()

    def _model_to_domain(self, user_model: UserModel) -> User:
        from domain.models.user import UserRole
        # Handle role conversion more robustly
        if isinstance(user_model.role, str):
            role_value = user_model.role.lower()
            if role_value == 'admin':
                role = UserRole.ADMIN
            elif role_value == 'owner':
                role = UserRole.OWNER
            elif role_value == 'employee':
                role = UserRole.EMPLOYEE
            else:
                role = UserRole.EMPLOYEE  # default
        else:
            role = user_model.role

        return User(
            id=user_model.id,
            username=user_model.username,
            password=user_model.password,
            role=role,
            business_id=user_model.business_id,
            name=user_model.name,
            phone=user_model.phone,
            email=user_model.email,
            status=user_model.status,
            created_at=user_model.created_at.isoformat() if user_model.created_at else None,
            updated_at=user_model.updated_at.isoformat() if user_model.updated_at else None
        )
