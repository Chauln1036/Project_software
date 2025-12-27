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
    try:
        data = request.get_json()
        if not data or 'username' not in data or 'password' not in data:
            return jsonify({'error': 'Username and password required'}), 400

        print(f"Login attempt for user: {data['username']}")

        user = session.query(UserModel).filter_by(username=data['username']).first()
        if not user:
            print(f"User not found: {data['username']}")
            return jsonify({'error': 'Invalid credentials'}), 401

        print(f"User found: {user.username}, checking password...")

        # Check password
        password_matches = bcrypt.checkpw(data['password'].encode('utf-8'), user.password.encode('utf-8'))
        if not password_matches:
            print(f"Password check failed for user: {data['username']}")
            return jsonify({'error': 'Invalid credentials'}), 401

        print(f"Password check passed for user: {data['username']}")

        payload = {
            'user_id': user.id,
            'username': user.username,
            'role': user.role.value,
            'business_id': user.business_id,
            'exp': (datetime.utcnow() + timedelta(hours=2)).timestamp()
        }

        secret_key = str(current_app.config['SECRET_KEY'])
        print(f"Secret key type: {type(secret_key)}, value: {secret_key[:10]}...")

        token = jwt.encode(payload, secret_key, algorithm='HS256')
        print(f"Login successful for user: {data['username']}")

        # Ensure token is string for JSON response
        if isinstance(token, bytes):
            token = token.decode('utf-8')

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
    except Exception as e:
        print(f"Login error: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': 'Internal server error'}), 500

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
