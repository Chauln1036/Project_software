#!/usr/bin/env python3
"""
Script để tạo dữ liệu demo cho BizFlow
Tạo dữ liệu mẫu cho: Users, Products, Customers, Inventory, Orders
Dành cho hộ kinh doanh vật liệu xây dựng tại Việt Nam
"""

import os
import sys
from datetime import datetime, timedelta
import random
import sqlite3

# Database file
DB_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'bizflow.db')

def create_tables():
    """Tạo các bảng cơ bản trong SQLite"""
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()

    # Tạo bảng users
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            name VARCHAR(100) NOT NULL,
            role VARCHAR(20) NOT NULL,
            phone VARCHAR(20),
            email VARCHAR(100),
            business_id INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Tạo bảng business
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS business (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(255) NOT NULL,
            owner_id INTEGER,
            address TEXT,
            phone VARCHAR(20),
            email VARCHAR(100),
            tax_code VARCHAR(20),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Tạo bảng products
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            business_id INTEGER,
            name VARCHAR(255) NOT NULL,
            price DECIMAL(10,2) NOT NULL,
            unit VARCHAR(20) NOT NULL,
            category VARCHAR(50),
            description TEXT,
            active BOOLEAN DEFAULT 1,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Tạo bảng customers
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS customers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            business_id INTEGER,
            name VARCHAR(255) NOT NULL,
            phone VARCHAR(20),
            address TEXT,
            total_debt DECIMAL(15,2) DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Tạo bảng orders
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            business_id INTEGER,
            customer_id INTEGER,
            employee_id INTEGER,
            total_amount DECIMAL(15,2) NOT NULL,
            debt_amount DECIMAL(15,2) DEFAULT 0,
            status VARCHAR(20) DEFAULT 'completed',
            payment_method VARCHAR(20) DEFAULT 'cash',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Tạo bảng order_items
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS order_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_id INTEGER,
            product_id INTEGER,
            quantity DECIMAL(10,2) NOT NULL,
            price DECIMAL(10,2) NOT NULL,
            total DECIMAL(15,2) NOT NULL
        )
    ''')

    conn.commit()
    conn.close()
    print("✓ Đã tạo các bảng cơ sở dữ liệu")

def create_demo_users():
    """Tạo tài khoản demo với data thực tế"""
    user_repo = UserRepository(session)

    users_data = [
        {
            'username': 'admin',
            'password': 'demo123',
            'role': UserRole.ADMIN,
            'name': 'Nguyễn Minh Anh',
            'phone': '0901234567',
            'email': 'admin@bizflow.vn'
        },
        # Chủ cửa hàng vật liệu xây dựng - Quận 1, TP.HCM
        {
            'username': 'nguyenvana',
            'password': 'demo123',
            'role': UserRole.OWNER,
            'name': 'Nguyễn Văn An',
            'phone': '0912345678',
            'email': 'nguyenvana@gmail.com'
        },
        # Chủ cửa hàng sắt thép - Quận Bình Tân
        {
            'username': 'tranthib',
            'password': 'demo123',
            'role': UserRole.OWNER,
            'name': 'Trần Thị Bình',
            'phone': '0987654321',
            'email': 'tranthib@gmail.com'
        },
        # Chủ cửa hàng gạch ngói - Quận 7
        {
            'username': 'levanc',
            'password': 'demo123',
            'role': UserRole.OWNER,
            'name': 'Lê Văn Cường',
            'phone': '0976543210',
            'email': 'levanc@gmail.com'
        },
        # Nhân viên cửa hàng Nguyễn Văn An
        {
            'username': 'hoangd',
            'password': 'demo123',
            'role': UserRole.EMPLOYEE,
            'name': 'Hoàng Văn Đức',
            'phone': '0934567890',
            'email': 'hoangd@gmail.com'
        },
        # Nhân viên cửa hàng Trần Thị Bình
        {
            'username': 'phamthie',
            'password': 'demo123',
            'role': UserRole.EMPLOYEE,
            'name': 'Phạm Thị Em',
            'phone': '0945678901',
            'email': 'phamthie@gmail.com'
        },
        # Nhân viên cửa hàng Lê Văn Cường
        {
            'username': 'vuthif',
            'password': 'demo123',
            'role': UserRole.EMPLOYEE,
            'name': 'Vũ Thị Linh',
            'phone': '0956789012',
            'email': 'vuthif@gmail.com'
        }
    ]

    users = []
    for user_data in users_data:
        # Check if user already exists
        existing_user = user_repo.get_by_username(user_data['username'])
        if existing_user:
            users.append(existing_user)
            print(f"✓ User đã tồn tại: {existing_user.username} - {existing_user.name}")
            continue

        user = User(**user_data)
        created_user = user_repo.add(user)
        users.append(created_user)
        print(f"✓ Tạo user: {created_user.username} - {created_user.name}")

    return users

def create_demo_business(owner_user):
    """Tạo doanh nghiệp demo"""
    from infrastructure.repositories.business_repository import BusinessRepository

    business_repo = BusinessRepository(session)

    business_data = {
        'name': 'Cửa hàng Vật liệu Xây dựng An Phát',
        'owner_id': owner_user.id,
        'address': '123 Đường ABC, Quận 1, TP.HCM',
        'phone': '02812345678',
        'email': 'contact@anphat.vn',
        'tax_code': '1234567890'
    }

    business = Business(**business_data)
    created_business = business_repo.add(business)
    print(f"✓ Tạo business: {created_business.name}")

    # Cập nhật business_id cho users
    user_repo = UserRepository(session)
    for user in [owner_user]:
        user.business_id = created_business.id
        user_repo.update(user)

    return created_business

def create_demo_products(business):
    """Tạo sản phẩm demo"""
    from infrastructure.repositories.product_repository import ProductRepository

    product_repo = ProductRepository(session)

    products_data = [
        # Xi măng
        {'name': 'Xi măng Portland PC30', 'price': 95000, 'unit': 'bao', 'category': 'Xi măng', 'description': 'Xi măng Portland PC30 - chất lượng cao'},
        {'name': 'Xi măng Portland PC40', 'price': 105000, 'unit': 'bao', 'category': 'Xi măng', 'description': 'Xi măng Portland PC40 - độ bền cao'},

        # Gạch
        {'name': 'Gạch đỏ 220x105x60mm', 'price': 1200, 'unit': 'viên', 'category': 'Gạch', 'description': 'Gạch đỏ chất lượng cao'},
        {'name': 'Gạch block 390x190x190mm', 'price': 8500, 'unit': 'viên', 'category': 'Gạch', 'description': 'Gạch block cách nhiệt'},

        # Cát và đá
        {'name': 'Cát vàng mịn', 'price': 280000, 'unit': 'm³', 'category': 'Cát đá', 'description': 'Cát vàng tự nhiên'},
        {'name': 'Đá 1x2', 'price': 320000, 'unit': 'm³', 'category': 'Cát đá', 'description': 'Đá mi sàng 1x2'},

        # Sắt thép
        {'name': 'Thép hình U100', 'price': 125000, 'unit': 'kg', 'category': 'Sắt thép', 'description': 'Thép hình U100'},
        {'name': 'Thép hình I200', 'price': 135000, 'unit': 'kg', 'category': 'Sắt thép', 'description': 'Thép hình I200'},

        # Ống nước
        {'name': 'Ống nhựa PVC 20mm', 'price': 35000, 'unit': 'm', 'category': 'Ống nước', 'description': 'Ống nhựa PVC đường kính 20mm'},
        {'name': 'Ống gang 50mm', 'price': 180000, 'unit': 'm', 'category': 'Ống nước', 'description': 'Ống gang dẻo đường kính 50mm'},

        # Sơn
        {'name': 'Sơn tường Dulux 5L', 'price': 850000, 'unit': 'thùng', 'category': 'Sơn', 'description': 'Sơn tường Dulux màu trắng'},
        {'name': 'Sơn sắt chống gỉ 1L', 'price': 280000, 'unit': 'thùng', 'category': 'Sơn', 'description': 'Sơn sắt chống gỉ đỏ'},

        # Công cụ
        {'name': 'Búa 500g', 'price': 120000, 'unit': 'cái', 'category': 'Công cụ', 'description': 'Búa thợ xây 500g'},
        {'name': 'Xẻng bê tông', 'price': 95000, 'unit': 'cái', 'category': 'Công cụ', 'description': 'Xẻng đổ bê tông'},
    ]

    products = []
    for product_data in products_data:
        product = Product(
            business_id=business.id,
            **product_data
        )
        created_product = product_repo.add(product)
        products.append(created_product)
        print(f"✓ Tạo product: {created_product.name}")

    return products

def create_demo_inventory(products):
    """Tạo tồn kho demo"""
    from infrastructure.repositories.inventory_repository import InventoryRepository

    inventory_repo = InventoryRepository(session)

    for product in products:
        # Random stock quantity
        quantity = random.randint(50, 500)
        min_stock = random.randint(10, 50)

        inventory = Inventory(
            product_id=product.id,
            quantity=quantity,
            min_stock=min_stock,
            last_updated=datetime.now()
        )

        created_inventory = inventory_repo.add(inventory)
        print(f"✓ Tạo inventory: {product.name} - {quantity} {product.unit}")

    return True

def create_demo_customers(business):
    """Tạo khách hàng demo"""
    from infrastructure.repositories.customer_repository import CustomerRepository

    customer_repo = CustomerRepository(session)

    customers_data = [
        {'name': 'Công ty TNHH Xây dựng Minh Phát', 'phone': '02812345678', 'address': '456 Đường XYZ, Quận 7, TP.HCM'},
        {'name': 'Anh Nguyễn Văn Đức', 'phone': '0912345678', 'address': '789 Đường DEF, Quận Bình Thạnh, TP.HCM'},
        {'name': 'Chị Trần Thị Lan', 'phone': '0934567890', 'address': '321 Đường GHI, Quận Tân Bình, TP.HCM'},
        {'name': 'Công ty CP Đầu tư BĐS Hoàng Gia', 'phone': '02887654321', 'address': '654 Đường JKL, Quận 1, TP.HCM'},
        {'name': 'Anh Lê Văn Minh', 'phone': '0987654321', 'address': '987 Đường MNO, Quận 3, TP.HCM'},
        {'name': 'Cô Phạm Thị Hoa', 'phone': '0965432187', 'address': '147 Đường PQR, Quận 10, TP.HCM'},
        {'name': 'Công ty TNHH Thương mại Quốc Tế', 'phone': '02811223344', 'address': '258 Đường STU, Quận 2, TP.HCM'},
        {'name': 'Anh Võ Văn Tùng', 'phone': '0943216789', 'address': '369 Đường VWX, Quận Thủ Đức, TP.HCM'},
    ]

    customers = []
    for customer_data in customers_data:
        customer = Customer(
            business_id=business.id,
            **customer_data,
            total_debt=random.randint(0, 5000000)  # Random debt up to 5M VND
        )
        created_customer = customer_repo.add(customer)
        customers.append(created_customer)
        print(f"✓ Tạo customer: {created_customer.name}")

    return customers

def create_demo_orders(business, products, customers, employees):
    """Tạo đơn hàng demo"""
    from infrastructure.repositories.order_repository import OrderRepository

    order_repo = OrderRepository(session)

    orders = []

    # Tạo 15 đơn hàng mẫu
    for i in range(15):
        # Random customer (some orders without customer - walk-in)
        customer = random.choice(customers + [None])

        # Random employee
        employee = random.choice(employees)

        # Random order date (last 30 days)
        order_date = datetime.now() - timedelta(days=random.randint(0, 30))

        # Random items (2-5 items per order)
        num_items = random.randint(2, 5)
        selected_products = random.sample(products, num_items)

        order_items = []
        total_amount = 0

        for product in selected_products:
            quantity = random.randint(1, 10)
            price = product.price
            total = quantity * price
            total_amount += total

            item = OrderItem(
                product_id=product.id,
                quantity=quantity,
                price=price,
                total=total
            )
            order_items.append(item)

        # Random payment method and debt
        payment_methods = ['cash', 'transfer', 'debt']
        payment_method = random.choice(payment_methods)
        debt_amount = random.randint(0, int(total_amount * 0.5)) if payment_method == 'debt' else 0

        order = Order(
            business_id=business.id,
            customer_id=customer.id if customer else None,
            employee_id=employee.id,
            items=order_items,
            total_amount=total_amount,
            debt_amount=debt_amount,
            status='completed',
            payment_method=payment_method,
            created_at=order_date.isoformat()
        )

        created_order = order_repo.add(order)
        orders.append(created_order)
        print(f"✓ Tạo order: #{created_order.id} - {total_amount:,} VND - {customer.name if customer else 'Walk-in'}")

    return orders

def main():
    """Main function to seed demo data"""
    print("🚀 Bắt đầu tạo dữ liệu demo cho BizFlow...")

    try:
        # 1. Create demo users
        print("\n👤 Tạo tài khoản demo...")
        users = create_demo_users()

        # Separate users by role
        admin_user = next(u for u in users if u.role == UserRole.ADMIN)
        owner_user = next(u for u in users if u.role == UserRole.OWNER)
        employee_users = [u for u in users if u.role == UserRole.EMPLOYEE]

        # 2. Create business
        print("\n🏢 Tạo doanh nghiệp demo...")
        business = create_demo_business(owner_user)

        # 3. Create products
        print("\n📦 Tạo sản phẩm demo...")
        products = create_demo_products(business)

        # 4. Create inventory
        print("\n📊 Tạo tồn kho demo...")
        create_demo_inventory(products)

        # 5. Create customers
        print("\n👥 Tạo khách hàng demo...")
        customers = create_demo_customers(business)

        # 6. Create orders
        print("\n🛒 Tạo đơn hàng demo...")
        create_demo_orders(business, products, customers, employee_users)

        print("\n✅ HOÀN THÀNH! Dữ liệu demo đã được tạo thành công!")
        print("\n📋 Tóm tắt:")
        print(f"   - {len(users)} tài khoản người dùng")
        print(f"   - 1 doanh nghiệp")
        print(f"   - {len(products)} sản phẩm")
        print(f"   - {len(products)} bản ghi tồn kho")
        print(f"   - {len(customers)} khách hàng")
        print("   - 15 đơn hàng mẫu")

    except Exception as e:
        print(f"\n❌ LỖI: {str(e)}")
        session.rollback()
        raise
    finally:
        session.close()

if __name__ == '__main__':
    main()
