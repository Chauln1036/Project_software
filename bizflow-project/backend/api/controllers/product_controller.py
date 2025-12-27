from flask import Blueprint, request, jsonify
from infrastructure.databases.mysql import session
from domain.models.product import Product
from infrastructure.models.product_model import ProductModel
from datetime import datetime

product_bp = Blueprint('product', __name__, url_prefix='/api/products')

@product_bp.route('/', methods=['GET'])
def get_products():
    business_id = request.args.get('business_id', type=int)
    if not business_id:
        return jsonify({'error': 'Business ID required'}), 400

    products = session.query(ProductModel).filter_by(business_id=business_id).all()
    result = []
    for p in products:
        result.append({
            'id': p.id,
            'business_id': p.business_id,
            'name': p.name,
            'description': p.description,
            'price': p.price,
            'unit': p.unit,
            'category': p.category,
            'image_url': p.image_url,
            'status': p.status,
            'created_at': p.created_at.isoformat() if p.created_at else None,
            'updated_at': p.updated_at.isoformat() if p.updated_at else None
        })
    return jsonify(result)

@product_bp.route('/', methods=['POST'])
def create_product():
    data = request.get_json()
    required_fields = ['business_id', 'name', 'price']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Business ID, name, and price required'}), 400

    product = ProductModel(
        business_id=data['business_id'],
        name=data['name'],
        description=data.get('description'),
        price=data['price'],
        unit=data.get('unit', 'pcs'),
        category=data.get('category'),
        image_url=data.get('image_url'),
        status=True,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    session.add(product)
    session.commit()
    return jsonify({'message': 'Product created', 'id': product.id}), 201

@product_bp.route('/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    data = request.get_json()
    product = session.query(ProductModel).filter_by(id=product_id).first()
    if not product:
        return jsonify({'error': 'Product not found'}), 404

    for field in ['name', 'description', 'price', 'unit', 'category', 'image_url', 'status']:
        if field in data:
            setattr(product, field, data[field])

    product.updated_at = datetime.now()
    session.commit()
    return jsonify({'message': 'Product updated'})

@product_bp.route('/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    product = session.query(ProductModel).filter_by(id=product_id).first()
    if not product:
        return jsonify({'error': 'Product not found'}), 404

    session.delete(product)
    session.commit()
    return jsonify({'message': 'Product deleted'})
