# BizFlow Backend - Flask Clean Architecture

Backend API cho nền tảng BizFlow sử dụng kiến trúc sạch (Clean Architecture) với Python Flask.

## 🏗 Kiến trúc dự án

```
Flask-CleanArchitecture/
├── src/
│   ├── api/                  # API Controllers & Routes
│   │   ├── controllers/      # Request handlers
│   │   ├── schemas/         # Marshmallow validation schemas
│   │   └── routes.py        # API routing
│   ├── domain/              # Business Logic Layer
│   │   ├── models/          # Domain entities (User, Product, Order, etc.)
│   │   └── exceptions.py    # Domain exceptions
│   ├── infrastructure/      # Data Access Layer
│   │   ├── databases/       # Database configurations
│   │   ├── models/          # SQLAlchemy models
│   │   └── repositories/    # Repository implementations
│   ├── services/           # Application Services
│   ├── config.py           # Application configuration
│   ├── create_app.py       # Flask app factory
│   └── app.py              # Application entry point
├── requirements.txt        # Python dependencies
└── README.md
```

## 🚀 Cài đặt và chạy

### Yêu cầu hệ thống

- Python 3.8+
- SQL Server (MSSQL) - đã được cấu hình trong file .env của thầy

### 1. Chuẩn bị môi trường

```bash
# Tạo virtual environment
python -m venv venv

# Kích hoạt virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate
```

### 2. Cài đặt dependencies

```bash
pip install -r requirements.txt
```

### 3. Cấu hình Database

**SQL Server với Docker (theo hướng dẫn của thầy):**

```bash
# Pull SQL Server image
docker pull mcr.microsoft.com/mssql/server:2025-latest

# Run SQL Server container
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=Aa123456" -p 1433:1433 --name sql1 --hostname sql1 -d mcr.microsoft.com/mssql/server:2025-latest
```

**Lưu ý**: File `.env` đã được thầy cung cấp và không được sửa đổi.

### 4. Khởi tạo Database

```bash
# Tạo database tables
python setup_db.py
```

### 5. Chạy ứng dụng

```bash
python app.py
```

Backend sẽ chạy tại: http://localhost:5000
API Documentation: http://localhost:5000/docs

## 📊 Tính năng đã triển khai

### ✅ Đã hoàn thành

- **Domain Models**: User, Business, Product, Order, Customer, Inventory, DraftOrder
- **Infrastructure Models**: SQLAlchemy models cho tất cả entities
- **Repository Pattern**: UserRepository với đầy đủ CRUD operations
- **Database Setup**: SQL Server (MSSQL) configuration và migration scripts

### 🚧 Đang phát triển

- API Controllers cho authentication, products, orders
- Business Services (UserService, OrderService, etc.)
- AI Integration (NLP processing, speech-to-text)
- PostgreSQL cho AI data và analytics

## 🛠 Công nghệ sử dụng

- **Framework**: Flask với Clean Architecture pattern
- **ORM**: SQLAlchemy
- **Database**: SQL Server (MSSQL - từ file .env của thầy)
- **Validation**: Marshmallow schemas
- **Documentation**: Swagger/OpenAPI
- **AI**: OpenAI API, Google Speech-to-Text, ChromaDB (sẽ triển khai)

## 📚 API Endpoints (đang phát triển)

```
POST   /api/auth/login
POST   /api/auth/register
GET    /api/users
POST   /api/products
GET    /api/orders
POST   /api/ai/process-text
```

## 🔧 Development Notes

### Clean Architecture Layers

1. **Domain Layer**: Business logic và entities
2. **Application Layer**: Use cases và services
3. **Infrastructure Layer**: External concerns (database, APIs)
4. **Presentation Layer**: API controllers và routes

### Database Schema

- `bizflow_user`: Users với roles (employee, owner, admin)
- `bizflow_business`: Household businesses
- `bizflow_product`: Product catalog
- `bizflow_inventory`: Stock management
- `bizflow_customer`: Customer information
- `bizflow_order`: Sales orders
- `bizflow_order_item`: Order line items
- `bizflow_draft_order`: AI-generated order drafts
