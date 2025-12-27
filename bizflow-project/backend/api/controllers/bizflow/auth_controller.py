import jwt
import datetime
from flask import Blueprint, request, jsonify, current_app
from domain.models.user import User, UserRole
from infrastructure.repositories.user_repository import UserRepository
from infrastructure.databases import get_session

bp = Blueprint('bizflow_auth', __name__, url_prefix='/api/auth')

# Initialize repo with session after app context is available
user_repo = None

def get_user_repo():
    global user_repo
    if user_repo is None:
        session = get_session()
        user_repo = UserRepository(session)
    return user_repo

@bp.route('/login', methods=['POST'])
def login():
    """User login endpoint"""
    try:
        data = request.get_json()

        if not data or not data.get('username') or not data.get('password'):
            return jsonify({'error': 'Username and password required'}), 400

        username = data['username']
        password = data['password']

        # Find user by username
        user = get_user_repo().get_by_username(username)

        if not user:
            return jsonify({'error': 'Invalid credentials'}), 401

        # For demo purposes, we'll accept any password that matches "demo123"
        # In production, you'd hash and compare passwords properly
        if password == "demo123":
            return jsonify({
                'message': 'Login successful',
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'name': user.name,
                    'role': user.role.value if user.role else 'EMPLOYEE',
                    'business_id': user.business_id
                }
            }), 200
        else:
            return jsonify({'error': 'Invalid credentials'}), 401

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/register', methods=['POST'])
def register():
    """User registration endpoint"""
    try:
        data = request.get_json()

        if not data or not data.get('username') or not data.get('password') or not data.get('name'):
            return jsonify({'error': 'Username, password, and name required'}), 400

        username = data['username']
        name = data['name']
        password = data['password']

        # Check if user already exists
        existing_user = get_user_repo().get_by_username(username)
        if existing_user:
            return jsonify({'error': 'Username already exists'}), 409

        # Create new user with provided role
        role = UserRole.EMPLOYEE  # default
        if data.get('role'):
            role_str = data['role'].upper()
            if role_str in [r.value for r in UserRole]:
                role = UserRole(role_str)
        new_user = User(
            username=username,
            password=password,  # In production, hash this password
            name=name,
            role=role
        )

        created_user = get_user_repo().add(new_user)

        return jsonify({
            'message': 'User registered successfully',
            'user': {
                'id': created_user.id,
                'username': created_user.username,
                'name': created_user.name,
                'role': created_user.role.value if created_user.role else 'employee'
            }
        }), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/logout', methods=['POST'])
def logout():
    """User logout endpoint"""
    return jsonify({'message': 'Logged out successfully'}), 200
