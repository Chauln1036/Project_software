from flask import Blueprint, request, jsonify
from infrastructure.databases.mysql import session
from infrastructure.models.order_model import OrderModel
from infrastructure.models.product_model import ProductModel
from infrastructure.models.customer_model import CustomerModel
from sqlalchemy import func
from datetime import datetime, timedelta

reports_bp = Blueprint('reports', __name__, url_prefix='/api/reports')

@reports_bp.route('/summary', methods=['GET'])
def get_summary_report():
    business_id = request.args.get('business_id', type=int)
    if not business_id:
        return jsonify({'error': 'Business ID required'}), 400

    # Calculate total revenue from completed orders
    total_revenue_result = session.query(
        func.sum(OrderModel.total_amount)
    ).filter(
        OrderModel.business_id == business_id,
        OrderModel.status == 'completed'
    ).scalar()

    total_revenue = float(total_revenue_result) if total_revenue_result else 0

    # Count total orders
    total_orders = session.query(OrderModel).filter(
        OrderModel.business_id == business_id
    ).count()

    # Count total products
    total_products = session.query(ProductModel).filter(
        ProductModel.business_id == business_id
    ).count()

    # Count total customers
    total_customers = session.query(CustomerModel).filter(
        CustomerModel.business_id == business_id
    ).count()

    # Get monthly revenue for the last 6 months
    six_months_ago = datetime.now() - timedelta(days=180)
    monthly_revenue = session.query(
        func.date_format(OrderModel.created_at, '%Y-%m').label('month'),
        func.sum(OrderModel.total_amount).label('revenue')
    ).filter(
        OrderModel.business_id == business_id,
        OrderModel.status == 'completed',
        OrderModel.created_at >= six_months_ago
    ).group_by(
        func.date_format(OrderModel.created_at, '%Y-%m')
    ).order_by(
        func.date_format(OrderModel.created_at, '%Y-%m')
    ).all()

    monthly_data = [
        {
            'month': row.month,
            'revenue': float(row.revenue) if row.revenue else 0
        }
        for row in monthly_revenue
    ]

    return jsonify({
        'totalRevenue': total_revenue,
        'totalOrders': total_orders,
        'totalProducts': total_products,
        'totalCustomers': total_customers,
        'monthlyRevenue': monthly_data
    })
