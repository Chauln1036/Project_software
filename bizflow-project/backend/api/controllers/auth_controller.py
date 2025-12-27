import jwt
import bcrypt
from flask import Blueprint, request, jsonify, current_app
from datetime import datetime, timedelta
from infrastructure.models.user_model import UserModel
from infrastructure.databases.mysql import session
from domain.models.user import User, UserRole

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({'error': 'Username and password required'}), 400

    user = session.query(UserModel).filter_by(username=data['username']).first()
    if not user or not bcrypt.checkpw(data['password'].encode('utf-8'), user.password.encode('utf-8')):
        return jsonify({'error': 'Invalid credentials'}), 401

    payload = {
        'user_id': user.id,
        'username': user.username,
        'role': user.role.value,
        'business_id': user.business_id,
        'exp': datetime.utcnow() + timedelta(hours=2)
    }
    token = jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256')
    return jsonify({
        'token': token,
        'user': {
            'id': user.id,
            'username': user.username,
            'role': user.role.value,
            'business_id': user.business_id,
            'name': user.name
        }
    })

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    required_fields = ['username', 'password', 'role']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Username, password, and role required'}), 400

    if session.query(UserModel).filter_by(username=data['username']).first():
        return jsonify({'error': 'Username already exists'}), 409

    try:
        role = UserRole(data['role'])
    except ValueError:
        return jsonify({'error': 'Invalid role'}), 400

    hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    user = UserModel(
        username=data['username'],
        password=hashed_password,
        role=role,
        business_id=data.get('business_id'),
        name=data.get('name'),
        phone=data.get('phone'),
        email=data.get('email'),
        status=True,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    session.add(user)
    session.commit()

    return jsonify({'message': 'User registered successfully', 'user_id': user.id}), 201

@auth_bp.route('/logout', methods=['POST'])
def logout():
    # For stateless JWT, logout is handled client-side by removing token
    return jsonify({'message': 'Logged out successfully'})
