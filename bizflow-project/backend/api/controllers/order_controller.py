from flask import Blueprint, request, jsonify
from infrastructure.databases.mysql import session
from infrastructure.models.order_model import OrderModel
from infrastructure.models.order_item_model import OrderItemModel
from datetime import datetime

order_bp = Blueprint('order', __name__, url_prefix='/api/orders')

@order_bp.route('/', methods=['GET'])
def get_orders():
    business_id = request.args.get('business_id', type=int)
    if not business_id:
        return jsonify({'error': 'Business ID required'}), 400

    orders = session.query(OrderModel).filter_by(business_id=business_id).all()
    result = []
    for o in orders:
        items = session.query(OrderItemModel).filter_by(order_id=o.id).all()
        item_list = []
        for item in items:
            item_list.append({
                'product_id': item.product_id,
                'quantity': item.quantity,
                'price': item.price,
                'total': item.total
            })
        result.append({
            'id': o.id,
            'business_id': o.business_id,
            'customer_id': o.customer_id,
            'employee_id': o.employee_id,
            'total_amount': o.total_amount,
            'debt_amount': o.debt_amount,
            'status': o.status,
            'payment_method': o.payment_method,
            'notes': o.notes,
            'items': item_list,
            'created_at': o.created_at.isoformat() if o.created_at else None,
        })
    return jsonify(result)

@order_bp.route('/', methods=['POST'])
def create_order():
    data = request.get_json()
    required_fields = ['business_id', 'employee_id', 'total_amount', 'items']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Business ID, employee ID, total amount, and items required'}), 400

    order = OrderModel(
        business_id=data['business_id'],
        customer_id=data.get('customer_id'),
        employee_id=data['employee_id'],
        total_amount=data['total_amount'],
        debt_amount=data.get('debt_amount', 0),
        status=data.get('status', 'pending'),
        payment_method=data.get('payment_method'),
        notes=data.get('notes'),
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    session.add(order)
    session.flush()  # To get order.id

    # Add order items
    for item in data['items']:
        order_item = OrderItemModel(
            order_id=order.id,
            product_id=item['product_id'],
            quantity=item['quantity'],
            price=item['price'],
            total=item['total']
        )
        session.add(order_item)

    session.commit()
    return jsonify({'message': 'Order created', 'order_id': order.id}), 201

@order_bp.route('/<int:order_id>', methods=['GET'])
def get_order(order_id):
    order = session.query(OrderModel).filter_by(id=order_id).first()
    if not order:
        return jsonify({'error': 'Order not found'}), 404

    items = session.query(OrderItemModel).filter_by(order_id=order.id).all()
    item_list = []
    for item in items:
        item_list.append({
            'product_id': item.product_id,
            'quantity': item.quantity,
            'price': item.price,
            'total': item.total
        })

    return jsonify({
        'id': order.id,
        'business_id': order.business_id,
        'customer_id': order.customer_id,
        'employee_id': order.employee_id,
        'total_amount': order.total_amount,
        'debt_amount': order.debt_amount,
        'status': order.status,
        'payment_method': order.payment_method,
        'notes': order.notes,
        'items': item_list,
        'created_at': order.created_at.isoformat() if order.created_at else None,
    })

@order_bp.route('/<int:order_id>', methods=['PUT'])
def update_order(order_id):
    data = request.get_json()
    order = session.query(OrderModel).filter_by(id=order_id).first()
    if not order:
        return jsonify({'error': 'Order not found'}), 404

    for field in ['customer_id', 'employee_id', 'total_amount', 'debt_amount', 'status', 'payment_method', 'notes']:
        if field in data:
            setattr(order, field, data[field])

    order.updated_at = datetime.now()
    session.commit()
    return jsonify({'message': 'Order updated'})

@order_bp.route('/<int:order_id>', methods=['DELETE'])
def delete_order(order_id):
    # Delete order items first
    session.query(OrderItemModel).filter_by(order_id=order_id).delete()
    # Then delete order
    session.query(OrderModel).filter_by(id=order_id).delete()
    session.commit()
    return jsonify({'message': 'Order deleted'})
