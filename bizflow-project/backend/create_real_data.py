#!/usr/bin/env python3
"""
Script tạo dữ liệu thực tế cho BizFlow
Dành cho hộ kinh doanh vật liệu xây dựng tại Việt Nam
"""

import sqlite3
import os
from datetime import datetime, timedelta
import random

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

def insert_users():
    """Thêm users thực tế"""
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()

    users = [
        ('admin', 'demo123', 'Nguyễn Minh Anh', 'ADMIN', '0901234567', 'admin@bizflow.vn', None),
        ('nguyenvana', 'demo123', 'Nguyễn Văn An', 'OWNER', '0912345678', 'nguyenvana@gmail.com', 1),
        ('tranthib', 'demo123', 'Trần Thị Bình', 'OWNER', '0987654321', 'tranthib@gmail.com', 2),
        ('levanc', 'demo123', 'Lê Văn Cường', 'OWNER', '0976543210', 'levanc@gmail.com', 3),
        ('hoangd', 'demo123', 'Hoàng Văn Đức', 'EMPLOYEE', '0934567890', 'hoangd@gmail.com', 1),
        ('phamthie', 'demo123', 'Phạm Thị Em', 'EMPLOYEE', '0945678901', 'phamthie@gmail.com', 2),
        ('vuthif', 'demo123', 'Vũ Thị Linh', 'EMPLOYEE', '0956789012', 'vuthif@gmail.com', 3),
    ]

    for user in users:
        cursor.execute('''
            INSERT OR REPLACE INTO users (username, password, name, role, phone, email, business_id)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', user)

    conn.commit()
    conn.close()
    print("✓ Đã tạo 7 tài khoản người dùng")

def insert_business():
    """Thêm doanh nghiệp thực tế"""
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()

    businesses = [
        (1, 'Cửa hàng Vật liệu Xây dựng An Phát', '123 Đ. Trần Hưng Đạo, Quận 1, TP.HCM', '02812345678', 'contact@anphat.vn', '0312345678'),
        (2, 'Sắt Thép Bình Minh', '456 Đ. Cách Mạng Tháng 8, Quận Bình Tân, TP.HCM', '02887654321', 'info@satthuongminh.vn', '0318765432'),
        (3, 'Gạch Ngói Cường Thịnh', '789 Đ. Nguyễn Văn Linh, Quận 7, TP.HCM', '02811223344', 'sales@gachngoicuongthinh.vn', '0311122334'),
    ]

    for business in businesses:
        cursor.execute('''
            INSERT OR REPLACE INTO business (id, name, address, phone, email, tax_code)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', business)

    conn.commit()
    conn.close()
    print("✓ Đã tạo 3 doanh nghiệp hộ kinh doanh")

def insert_products():
    """Thêm sản phẩm vật liệu xây dựng thực tế"""
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()

    products = [
        # Xi măng (Business 1)
        (1, 'Xi măng Portland PC30 Hoàng Thạch', 92000, 'bao', 'Xi măng', 'Xi măng PC30 chất lượng cao, phù hợp xây dựng nhà ở'),
        (1, 'Xi măng Portland PC40 FICO', 105000, 'bao', 'Xi măng', 'Xi măng PC40 độ bền cao, phù hợp công trình lớn'),
        (1, 'Xi măng trắng SCG', 185000, 'bao', 'Xi măng', 'Xi măng trắng Thái Lan, độ trắng cao'),

        # Gạch (Business 3)
        (3, 'Gạch đỏ Tuynel 220x105x60mm', 1150, 'viên', 'Gạch', 'Gạch đỏ chất lượng, chịu lực tốt'),
        (3, 'Gạch block 390x190x190mm', 8200, 'viên', 'Gạch', 'Gạch block cách nhiệt, giảm tiếng ồn'),
        (3, 'Gạch lát nền 300x300mm', 45000, 'm²', 'Gạch', 'Gạch lát nền men bóng, dễ lau chùi'),

        # Sắt thép (Business 2)
        (2, 'Thép hình U100 Việt Nhật', 122000, 'kg', 'Sắt thép', 'Thép hình U dày 100mm, chịu lực cao'),
        (2, 'Thép hình I200 Hòa Phát', 132000, 'kg', 'Sắt thép', 'Thép hình I dày 200mm, công trình lớn'),
        (2, 'Thép cây φ12 Pomina', 18500, 'kg', 'Sắt thép', 'Thép cây đường kính 12mm'),

        # Cát đá (Business 1)
        (1, 'Cát vàng mịn Đồng Nai', 275000, 'm³', 'Cát đá', 'Cát vàng tự nhiên, độ mịn cao'),
        (1, 'Đá mi sàng 1x2', 315000, 'm³', 'Cát đá', 'Đá xây dựng loại 1x2'),
        (1, 'Đá hộc 4x6', 285000, 'm³', 'Cát đá', 'Đá hộc lớn 4x6'),

        # Ống nước (Business 1)
        (1, 'Ống nhựa PVC 20mm Tân Á', 32000, 'm', 'Ống nước', 'Ống PVC đường kính 20mm, chịu áp lực'),
        (1, 'Ống gang 50mm Việt Nhật', 175000, 'm', 'Ống nước', 'Ống gang dẻo đường kính 50mm'),

        # Sơn (Business 2)
        (2, 'Sơn tường Dulux 5L trắng', 825000, 'thùng', 'Sơn', 'Sơn tường Dulux siêu bóng, màu trắng'),
        (2, 'Sơn sắt chống gỉ Jotun 1L', 275000, 'thùng', 'Sơn', 'Sơn chống gỉ, màu đỏ'),

        # Công cụ (Business 1)
        (1, 'Búa 500g STANLEY', 115000, 'cái', 'Công cụ', 'Búa thợ xây 500g, cán gỗ'),
        (1, 'Xẻng bê tông 1.5kg', 92000, 'cái', 'Công cụ', 'Xẻng đổ bê tông chuyên dụng'),
    ]

    for product in products:
        cursor.execute('''
            INSERT OR REPLACE INTO products (business_id, name, price, unit, category, description)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', product)

    conn.commit()
    conn.close()
    print("✓ Đã tạo 15 sản phẩm vật liệu xây dựng thực tế")

def insert_customers():
    """Thêm khách hàng thực tế"""
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()

    customers = [
        (1, 'Công ty TNHH Xây dựng Minh Phát', '02812345678', '456 Đ. Nguyễn Văn Linh, Quận 7, TP.HCM', 2500000),
        (1, 'Anh Nguyễn Văn Đức', '0912345678', '789 Đ. Cách Mạng Tháng 8, Quận 3, TP.HCM', 1200000),
        (1, 'Chị Trần Thị Lan', '0934567890', '321 Đ. Phạm Ngũ Lão, Quận 1, TP.HCM', 850000),
        (3, 'Công ty CP Đầu tư BĐS Hoàng Gia', '02887654321', '654 Đ. Võ Văn Kiệt, Quận 1, TP.HCM', 5800000),
        (3, 'Anh Lê Văn Minh', '0987654321', '987 Đ. Điện Biên Phủ, Quận Bình Thạnh, TP.HCM', 3200000),
        (3, 'Cô Phạm Thị Hoa', '0965432187', '147 Đ. Nguyễn Thị Minh Khai, Quận 3, TP.HCM', 950000),
        (2, 'Công ty TNHH Thương mại Quốc Tế', '02811223344', '258 Đ. Nam Kỳ Khởi Nghĩa, Quận 3, TP.HCM', 4100000),
        (2, 'Anh Võ Văn Tùng', '0943216789', '369 Đ. CMT8, Quận 10, TP.HCM', 1750000),
        (1, 'Chị Nguyễn Thị Mai', '0923456789', '741 Đ. Hoàng Sa, Quận 3, TP.HCM', 650000),
        (2, 'Anh Trần Văn Hùng', '0956789012', '852 Đ. Trần Quang Khải, Quận 1, TP.HCM', 2800000),
    ]

    for customer in customers:
        cursor.execute('''
            INSERT OR REPLACE INTO customers (business_id, name, phone, address, total_debt)
            VALUES (?, ?, ?, ?, ?)
        ''', customer)

    conn.commit()
    conn.close()
    print("✓ Đã tạo 10 khách hàng thực tế với nợ công nợ riêng")

def insert_orders():
    """Thêm đơn hàng thực tế"""
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()

    # Lấy danh sách sản phẩm và khách hàng
    cursor.execute("SELECT id, business_id, price, name FROM products")
    products = cursor.fetchall()

    cursor.execute("SELECT id, business_id FROM customers")
    customers = cursor.fetchall()

    cursor.execute("SELECT id, business_id FROM users WHERE role='EMPLOYEE'")
    employees = cursor.fetchall()

    orders = []

    # Tạo 25 đơn hàng mẫu thực tế
    for i in range(25):
        # Random business (1, 2, hoặc 3)
        business_id = random.choice([1, 2, 3])

        # Random customer từ business đó
        business_customers = [c for c in customers if c[1] == business_id]
        customer = random.choice(business_customers) if business_customers and random.random() > 0.3 else None

        # Random employee từ business đó
        business_employees = [e for e in employees if e[1] == business_id]
        employee = random.choice(business_employees) if business_employees else employees[0]

        # Random order date (last 60 days)
        order_date = datetime.now() - timedelta(days=random.randint(0, 60))

        # Random items (2-6 items per order)
        business_products = [p for p in products if p[1] == business_id]
        num_items = random.randint(2, 6)
        selected_products = random.sample(business_products, min(num_items, len(business_products)))

        order_items = []
        total_amount = 0

        for product in selected_products:
            # Random quantity dựa trên tên sản phẩm
            product_name = product[3].lower()  # name is index 3
            if 'bao' in product_name or 'thùng' in product_name:
                quantity = random.randint(1, 10)
            elif 'viên' in product_name:
                quantity = random.randint(50, 200)
            elif 'kg' in product_name:
                quantity = random.randint(5, 50)
            elif 'm' in product_name and 'm²' not in product_name and 'm³' not in product_name:
                quantity = random.randint(1, 20)
            elif 'm²' in product_name:
                quantity = random.randint(1, 5)
            elif 'm³' in product_name:
                quantity = random.uniform(0.5, 3)
            else:
                quantity = random.randint(1, 10)

            price = product[2]
            total = quantity * price
            total_amount += total

            order_items.append((product[0], quantity, price, total))  # product_id, quantity, price, total

        # Random payment method
        payment_methods = ['cash', 'transfer', 'debt']
        payment_method = random.choice(payment_methods)

        # Debt amount (if payment method is debt)
        debt_amount = random.randint(int(total_amount * 0.1), int(total_amount * 0.8)) if payment_method == 'debt' else 0

        # Insert order
        cursor.execute('''
            INSERT INTO orders (business_id, customer_id, employee_id, total_amount, debt_amount,
                              status, payment_method, created_at)
            VALUES (?, ?, ?, ?, ?, 'completed', ?, ?)
        ''', (business_id, customer[0] if customer else None, employee[0], total_amount, debt_amount,
              payment_method, order_date.isoformat()))

        order_id = cursor.lastrowid

        # Insert order items
        for item in order_items:
            cursor.execute('''
                INSERT INTO order_items (order_id, product_id, quantity, price, total)
                VALUES (?, ?, ?, ?, ?)
            ''', (order_id, item[0], item[1], item[2], item[3]))

        orders.append((order_id, total_amount, payment_method, customer[1] if customer else None))

    conn.commit()
    conn.close()

    print("✓ Đã tạo 25 đơn hàng thực tế với chi tiết sản phẩm")
    print("📊 Thống kê đơn hàng:")
    cash_orders = sum(1 for o in orders if o[2] == 'cash')
    debt_orders = sum(1 for o in orders if o[2] == 'debt')
    transfer_orders = sum(1 for o in orders if o[2] == 'transfer')

    print(f"   - Thanh toán tiền mặt: {cash_orders} đơn")
    print(f"   - Thanh toán chuyển khoản: {transfer_orders} đơn")
    print(f"   - Thanh toán nợ: {debt_orders} đơn")

def main():
    """Main function"""
    print("🚀 Bắt đầu tạo dữ liệu thực tế cho BizFlow...")
    print("🏪 Dữ liệu dành cho hộ kinh doanh vật liệu xây dựng tại Việt Nam")

    try:
        print("\n📋 Tạo cấu trúc database...")
        create_tables()

        print("\n👤 Tạo tài khoản người dùng...")
        insert_users()

        print("\n🏢 Tạo doanh nghiệp...")
        insert_business()

        print("\n📦 Tạo danh mục sản phẩm...")
        insert_products()

        print("\n👥 Tạo khách hàng...")
        insert_customers()

        print("\n🛒 Tạo đơn hàng & giao dịch...")
        insert_orders()

        print("\n✅ HOÀN THÀNH! Database đã sẵn sàng!")
        print("\n🎯 Tóm tắt dữ liệu:")
        print("   📊 7 tài khoản người dùng (Admin, Owners, Employees)")
        print("   🏪 3 hộ kinh doanh vật liệu xây dựng")
        print("   📦 15 sản phẩm thực tế (xi măng, gạch, sắt thép, cát đá, ống nước, sơn, công cụ)")
        print("   👥 10 khách hàng với nợ công nợ riêng")
        print("   🛒 25 đơn hàng với chi tiết đầy đủ")
        print("   💰 Tổng doanh thu: ~50-100 triệu VND")
        print("\n🔑 Tài khoản đăng nhập:")
        print("   Admin: admin / demo123")
        print("   Chủ cửa hàng: nguyenvana, tranthib, levanc / demo123")
        print("   Nhân viên: hoangd, phamthie, vuthif / demo123")

    except Exception as e:
        print(f"\n❌ LỖI: {str(e)}")
        import traceback
        traceback.print_exc()

if __name__ == '__main__':
    main()
