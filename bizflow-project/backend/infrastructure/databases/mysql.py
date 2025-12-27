from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from config import Config
from infrastructure.databases.base import Base
import bcrypt
from datetime import datetime

# Database configuration
DATABASE_URI = Config.DATABASE_URI
engine = create_engine(DATABASE_URI)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
session = SessionLocal()

def init_mysql(app):
    Base.metadata.create_all(bind=engine)
    create_demo_data()

def create_demo_data():
    """Create all demo data"""
    create_demo_businesses()
    create_demo_users()
    create_demo_products()
    create_demo_customers()
    create_demo_inventory()
    create_demo_orders()

def create_demo_businesses():
    """Create demo businesses"""
    from infrastructure.models.business_model import BusinessModel

    demo_businesses = [
        {
            'name': 'Công ty TNHH Xây Dựng ABC',
            'address': '123 Đường Lê Lợi, Quận 1, TP.HCM',
            'phone': '02812345678',
            'email': 'contact@abc.com',
            'tax_code': '03123456789',
            'owner_id': 2  # nguyenvana
        }
    ]

    for biz_data in demo_businesses:
        existing = session.query(BusinessModel).filter_by(name=biz_data['name']).first()
        if existing:
            continue

        business = BusinessModel(
            name=biz_data['name'],
            address=biz_data['address'],
            phone=biz_data['phone'],
            email=biz_data['email'],
            tax_code=biz_data['tax_code'],
            owner_id=biz_data['owner_id'],
            status=True,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        session.add(business)

    try:
        session.commit()
    except Exception as e:
        session.rollback()
        print(f"Error creating demo businesses: {e}")

def create_demo_users():
    """Create demo users if they don't exist"""
    from infrastructure.models.user_model import UserModel
    from domain.models.user import UserRole

    demo_users = [
        {
            'username': 'admin',
            'password': 'demo123',
            'role': UserRole.ADMIN,
            'name': 'Administrator',
            'business_id': None
        },
        {
            'username': 'nguyenvana',
            'password': 'demo123',
            'role': UserRole.OWNER,
            'name': 'Nguyễn Văn A',
            'business_id': 1
        },
        {
            'username': 'hoangd',
            'password': 'demo123',
            'role': UserRole.EMPLOYEE,
            'name': 'Hoàng D',
            'business_id': 1
        }
    ]

    for user_data in demo_users:
        # Check if user already exists
        existing_user = session.query(UserModel).filter_by(username=user_data['username']).first()
        if existing_user:
            continue

        # Hash password
        hashed_password = bcrypt.hashpw(user_data['password'].encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        # Create user
        user = UserModel(
            username=user_data['username'],
            password=hashed_password,
            role=user_data['role'],
            business_id=user_data['business_id'],
            name=user_data['name'],
            status=True,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )

        session.add(user)

    try:
        session.commit()
    except Exception as e:
        session.rollback()
        print(f"Error creating demo users: {e}")

def create_demo_products():
    """Create demo products"""
    from infrastructure.models.product_model import ProductModel

    demo_products = [
        {
            'name': 'Xi măng Portland PC30',
            'description': 'Xi măng Portland chất lượng cao PC30',
            'price': 95000,
            'unit': 'bao',
            'category': 'Xi măng',
            'business_id': 1
        },
        {
            'name': 'Gạch đỏ 220x105x60mm',
            'description': 'Gạch đỏ tiêu chuẩn Việt Nam',
            'price': 1200,
            'unit': 'viên',
            'category': 'Gạch',
            'business_id': 1
        },
        {
            'name': 'Cát vàng xây dựng',
            'description': 'Cát vàng loại 1 dùng cho xây dựng',
            'price': 280000,
            'unit': 'm³',
            'category': 'Cát',
            'business_id': 1
        },
        {
            'name': 'Đá 1x2 xây dựng',
            'description': 'Đá 1x2 loại 1 dùng cho bê tông',
            'price': 320000,
            'unit': 'm³',
            'category': 'Đá',
            'business_id': 1
        },
        {
            'name': 'Sắt thép phi 12',
            'description': 'Thép phi tròn đường kính 12mm',
            'price': 18500,
            'unit': 'kg',
            'category': 'Thép',
            'business_id': 1
        }
    ]

    for prod_data in demo_products:
        existing = session.query(ProductModel).filter_by(name=prod_data['name']).first()
        if existing:
            continue

        product = ProductModel(
            name=prod_data['name'],
            description=prod_data['description'],
            price=prod_data['price'],
            unit=prod_data['unit'],
            category=prod_data['category'],
            business_id=prod_data['business_id'],
            status=True,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        session.add(product)

    try:
        session.commit()
    except Exception as e:
        session.rollback()
        print(f"Error creating demo products: {e}")

def create_demo_customers():
    """Create demo customers"""
    from infrastructure.models.customer_model import CustomerModel

    demo_customers = [
        {
            'name': 'Công ty TNHH MTV Minh Phát',
            'phone': '02839998888',
            'email': 'minhphat@gmail.com',
            'address': '456 Đường Nguyễn Huệ, Quận 1, TP.HCM',
            'business_id': 1
        },
        {
            'name': 'Anh Nguyễn Văn Bình',
            'phone': '0912345678',
            'email': 'nguyenvanbinh@gmail.com',
            'address': '789 Đường Cách Mạng Tháng 8, Quận 3, TP.HCM',
            'business_id': 1
        },
        {
            'name': 'Công ty CP Đầu Tư Xây Dựng Hòa Bình',
            'phone': '02887654321',
            'email': 'hoabinh@hoabinh.com',
            'address': '321 Đường Điện Biên Phủ, Quận Bình Thạnh, TP.HCM',
            'business_id': 1
        },
        {
            'name': 'Chị Trần Thị Lan',
            'phone': '0987654321',
            'email': 'tranthilan@gmail.com',
            'address': '654 Đường Trường Chinh, Quận Tân Bình, TP.HCM',
            'business_id': 1
        }
    ]

    for cust_data in demo_customers:
        existing = session.query(CustomerModel).filter_by(phone=cust_data['phone']).first()
        if existing:
            continue

        customer = CustomerModel(
            name=cust_data['name'],
            phone=cust_data['phone'],
            email=cust_data.get('email'),
            address=cust_data.get('address'),
            business_id=cust_data['business_id'],
            status=True,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        session.add(customer)

    try:
        session.commit()
    except Exception as e:
        session.rollback()
        print(f"Error creating demo customers: {e}")

def create_demo_inventory():
    """Create demo inventory"""
    from infrastructure.models.inventory_model import InventoryModel

    # Get product IDs
    from infrastructure.models.product_model import ProductModel
    products = session.query(ProductModel).all()

    for product in products:
        existing = session.query(InventoryModel).filter_by(product_id=product.id).first()
        if existing:
            continue

        # Create inventory with random stock levels
        stock_levels = [50, 100, 150, 200, 75]
        import random
        quantity = random.choice(stock_levels)

        inventory = InventoryModel(
            product_id=product.id,
            quantity=quantity,
            min_stock=20,
            last_updated=datetime.now()
        )
        session.add(inventory)

    try:
        session.commit()
    except Exception as e:
        session.rollback()
        print(f"Error creating demo inventory: {e}")

def create_demo_orders():
    """Create demo orders"""
    from infrastructure.models.order_model import OrderModel
    from infrastructure.models.order_item_model import OrderItemModel

    # Get customers and products
    from infrastructure.models.customer_model import CustomerModel
    from infrastructure.models.product_model import ProductModel

    customers = session.query(CustomerModel).limit(3).all()
    products = session.query(ProductModel).all()

    demo_orders = [
        {
            'customer_id': customers[0].id if customers else 1,
            'business_id': 1,
            'employee_id': 3,  # hoangd (employee)
            'status': 'completed',
            'total_amount': 2850000,
            'items': [
                {'product_id': products[0].id, 'quantity': 20, 'price': products[0].price},
                {'product_id': products[1].id, 'quantity': 500, 'price': products[1].price}
            ]
        },
        {
            'customer_id': customers[1].id if len(customers) > 1 else 1,
            'business_id': 1,
            'employee_id': 3,  # hoangd (employee)
            'status': 'pending',
            'total_amount': 1560000,
            'items': [
                {'product_id': products[2].id, 'quantity': 2, 'price': products[2].price},
                {'product_id': products[3].id, 'quantity': 3, 'price': products[3].price}
            ]
        }
    ]

    for order_data in demo_orders:
        order = OrderModel(
            customer_id=order_data['customer_id'],
            business_id=order_data['business_id'],
            employee_id=order_data['employee_id'],
            status=order_data['status'],
            total_amount=order_data['total_amount'],
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        session.add(order)
        session.flush()  # Get order ID

        # Create order items
        for item_data in order_data['items']:
            order_item = OrderItemModel(
                order_id=order.id,
                product_id=item_data['product_id'],
                quantity=item_data['quantity'],
                price=item_data['price'],
                total=item_data['quantity'] * item_data['price']
            )
            session.add(order_item)

    try:
        session.commit()
    except Exception as e:
        session.rollback()
        print(f"Error creating demo orders: {e}")
