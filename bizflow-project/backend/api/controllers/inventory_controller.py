from flask import Blueprint, request, jsonify
from infrastructure.databases.mysql import session
from infrastructure.models.inventory_model import InventoryModel
from infrastructure.models.product_model import ProductModel
from datetime import datetime

inventory_bp = Blueprint('inventory', __name__, url_prefix='/api/inventory')

@inventory_bp.route('/', methods=['GET'])
def get_inventory():
    business_id = request.args.get('business_id', type=int)
    if not business_id:
        return jsonify({'error': 'Business ID required'}), 400

    # Get inventory with product details
    results = session.query(
        InventoryModel,
        ProductModel.name.label('product_name'),
        ProductModel.unit
    ).join(
        ProductModel,
        InventoryModel.product_id == ProductModel.id
    ).filter(
        ProductModel.business_id == business_id
    ).all()

    inventory_data = []
    for inventory, product_name, unit in results:
        inventory_data.append({
            'id': inventory.id,
            'product_id': inventory.product_id,
            'product_name': product_name,
            'unit': unit,
            'quantity': inventory.quantity,
            'min_stock': inventory.min_stock,
            'last_updated': inventory.last_updated.isoformat() if inventory.last_updated else None
        })

    return jsonify(inventory_data)

@inventory_bp.route('/<int:inventory_id>', methods=['PUT'])
def update_inventory(inventory_id):
    data = request.get_json()
    inventory = session.query(InventoryModel).filter_by(id=inventory_id).first()
    if not inventory:
        return jsonify({'error': 'Inventory not found'}), 404

    if 'quantity' in data:
        inventory.quantity = data['quantity']
    if 'min_stock' in data:
        inventory.min_stock = data['min_stock']

    inventory.last_updated = datetime.now()
    session.commit()
    return jsonify({'message': 'Inventory updated'})
