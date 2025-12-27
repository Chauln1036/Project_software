from flask import Blueprint, request, jsonify
from infrastructure.databases.mssql import session
from infrastructure.models.customer_model import CustomerModel
from datetime import datetime

customer_bp = Blueprint('customer', __name__, url_prefix='/api/customers')

@customer_bp.route('/', methods=['GET'])
def get_customers():
    business_id = request.args.get('business_id', type=int)
    if not business_id:
        return jsonify({'error': 'Business ID required'}), 400

    customers = session.query(CustomerModel).filter_by(business_id=business_id).all()
    result = []
    for c in customers:
        result.append({
            'id': c.id,
            'business_id': c.business_id,
            'name': c.name,
            'phone': c.phone,
            'address': c.address,
            'debt': c.debt,
            'created_at': c.created_at.isoformat() if c.created_at else None,
            'updated_at': c.updated_at.isoformat() if c.updated_at else None
        })
    return jsonify(result)

@customer_bp.route('/', methods=['POST'])
def create_customer():
    data = request.get_json()
    required_fields = ['business_id', 'name']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Business ID and name required'}), 400

    customer = CustomerModel(
        business_id=data['business_id'],
        name=data['name'],
        phone=data.get('phone'),
        address=data.get('address'),
        debt=data.get('debt', 0),
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    session.add(customer)
    session.commit()
    return jsonify({'message': 'Customer created', 'id': customer.id}), 201

@customer_bp.route('/<int:customer_id>', methods=['PUT'])
def update_customer(customer_id):
    data = request.get_json()
    customer = session.query(CustomerModel).filter_by(id=customer_id).first()
    if not customer:
        return jsonify({'error': 'Customer not found'}), 404

    for field in ['name', 'phone', 'address', 'debt']:
        if field in data:
            setattr(customer, field, data[field])

    customer.updated_at = datetime.now()
    session.commit()
    return jsonify({'message': 'Customer updated'})

@customer_bp.route('/<int:customer_id>', methods=['DELETE'])
def delete_customer(customer_id):
    customer = session.query(CustomerModel).filter_by(id=customer_id).first()
    if not customer:
        return jsonify({'error': 'Customer not found'}), 404

    session.delete(customer)
    session.commit()
    return jsonify({'message': 'Customer deleted'})
