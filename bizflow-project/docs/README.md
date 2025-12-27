# BizFlow - Hệ Thống Quản Lý Kinh Doanh

Một nền tảng quản lý kinh doanh toàn diện được xây dựng cho các hộ kinh doanh nhỏ tại Việt Nam, giúp số hóa và tối ưu hóa hoạt động kinh doanh vật liệu xây dựng.

## 🌟 Tính Năng Chính

### 👤 Quản Lý Người Dùng

- **3 Vai Trò**: Admin (quản trị hệ thống), Owner (chủ cửa hàng), Employee (nhân viên)
- **Xác Thực**: Đăng nhập an toàn với JWT
- **Phân Quyền**: Kiểm soát truy cập theo vai trò

### 🏪 Quản Lý Cửa Hàng

- **Thông Tin Doanh Nghiệp**: Quản lý thông tin cửa hàng
- **Nhân Sự**: Quản lý nhân viên và quyền hạn
- **Cài Đặt**: Tùy chỉnh hệ thống theo nhu cầu

### 📦 Quản Lý Sản Phẩm

- **Danh Mục Sản Phẩm**: Xi măng, gạch, cát đá, sắt thép, ống nước, sơn, công cụ
- **Quản Lý Tồn Kho**: Theo dõi số lượng, cảnh báo hết hàng
- **Định Giá**: Quản lý giá bán, đơn vị tính

### 🛒 Quản Lý Đơn Hàng

- **Tạo Đơn Hàng**: Giao diện tạo đơn nhanh
- **Theo Dõi Trạng Thái**: Pending → Confirmed → Completed
- **Lịch Sử Đơn Hàng**: Tra cứu và quản lý lịch sử
- **Khách Hàng**: Quản lý thông tin khách hàng và công nợ

### 📊 Báo Cáo & Thống Kê

- **Doanh Thu**: Theo dõi doanh thu theo thời gian
- **Sản Phẩm Bán Chạy**: Phân tích sản phẩm hot
- **Khách Hàng**: Thống kê khách hàng tiềm năng
- **Tồn Kho**: Báo cáo tồn kho và nhập xuất

## 🛠 Công Nghệ Sử Dung

### Frontend

- **Next.js 14**: React framework với App Router
- **TypeScript**: Type safety toàn diện
- **Tailwind CSS**: Utility-first CSS framework
- **Roboto Font**: Font chữ hỗ trợ tiếng Việt hoàn hảo

### Backend

- **Flask**: Python web framework
- **Clean Architecture**: Kiến trúc sạch, dễ maintain
- **SQLAlchemy**: ORM cho database
- **JWT**: Authentication & authorization

### Database

- **SQL Server**: Primary database
- **PostgreSQL**: Analytics & AI data
- **MySQL**: Alternative database
- **Redis**: Caching & session storage

### DevOps

- **Docker**: Containerization
- **Docker Compose**: Multi-service orchestration

## 📋 Yêu Cầu Hệ Thống

- **Node.js**: 18.17+
- **Python**: 3.8+
- **Docker**: Latest version
- **Git**: Latest version

## 🚀 Cài Đặt & Chạy

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/bizflow.git
cd bizflow
```

### 2. Chạy Demo (Frontend Only)

```bash
cd wireframe_bizflow
npm install
npm run dev
```

Truy cập: http://localhost:3000

**Tài khoản demo:**

- Admin: `admin` / `demo123`
- Owner: `owner` / `demo123`
- Employee: `employee` / `demo123`

### 3. Chạy Full Stack (Với Database)

#### Khởi động Database

```bash
docker-compose up -d
```

#### Chạy Backend APIs

```bash
# Terminal 1 - Auth API
cd Flask-CleanArchitecture/src
python auth_app.py

# Terminal 2 - Product API
python product_app.py

# Terminal 3 - Order API
python order_app.py
```

#### Chạy Frontend

```bash
cd wireframe_bizflow
npm install
npm run dev
```

### 4. Khởi Tạo Dữ Liệu Demo

```bash
cd Flask-CleanArchitecture/src
python seed_demo_data.py
```

## 📖 API Documentation

### Authentication API (Port 9997)

```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
```

### Product API (Port 9998)

```
GET  /api/products
POST /api/products
PUT  /api/products/:id
DELETE /api/products/:id
```

### Order API (Port 9996)

```
GET  /api/orders
POST /api/orders
PUT  /api/orders/:id
DELETE /api/orders/:id
```

## 🗄️ Database Schema

### Core Tables

- `bizflow_user`: Thông tin người dùng
- `bizflow_business`: Thông tin doanh nghiệp
- `bizflow_product`: Danh mục sản phẩm
- `bizflow_order`: Đơn hàng
- `bizflow_order_item`: Chi tiết đơn hàng
- `bizflow_customer`: Thông tin khách hàng
- `bizflow_inventory`: Tồn kho

### Analytics Tables

- `bizflow_inventory_transaction`: Lịch sử nhập xuất
- `bizflow_business_settings`: Cài đặt hệ thống

## 🔧 Cấu Hình

### Environment Variables

```bash
# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:9997
NEXT_PUBLIC_AUTH_API_URL=http://localhost:9997
NEXT_PUBLIC_PRODUCT_API_URL=http://localhost:9998
NEXT_PUBLIC_ORDER_API_URL=http://localhost:9996

# Backend (config.py)
DATABASE_URL=mssql+pyodbc://bizflow_user:bizflow_pass@localhost:1433/bizflow_db?driver=ODBC+Driver+17+for+SQL+Server
```

### Docker Services

```yaml
# docker-compose.yml
mysql:
  image: mysql:8.0
  ports: ["3306:3306"]

postgres:
  image: postgres:15
  ports: ["5432:5432"]

mssql:
  image: mcr.microsoft.com/mssql/server:2022-latest
  ports: ["1433:1433"]

redis:
  image: redis:7-alpine
  ports: ["6379:6379"]
```

## 🚀 Triển Khai Production

### Render Deployment

#### 1. Database (PostgreSQL)

- Tạo database trên Render
- Copy connection URL

#### 2. Backend (Flask)

```bash
# render.yaml
services:
  - type: web
    name: bizflow-backend
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: python src/app.py
    envVars:
      - key: DATABASE_URL
        value: postgresql://...
      - key: FLASK_ENV
        value: production
```

#### 3. Frontend (Next.js)

```bash
# render.yaml
services:
  - type: web
    name: bizflow-frontend
    env: node
    buildCommand: npm run build && npm run export
    staticPublishPath: out
    envVars:
      - key: NEXT_PUBLIC_API_URL
        value: https://bizflow-backend.onrender.com
```

### Domain Setup

- Custom domain trên Render
- SSL certificate tự động
- CDN và caching

## 📱 Screenshots

### Login Page

![Login](screenshots/login.png)

### Admin Dashboard

![Admin Dashboard](screenshots/admin-dashboard.png)

### Product Management

![Product Management](screenshots/products.png)

### Order Management

![Order Management](screenshots/orders.png)

## 🤝 Đóng Góp

1. Fork project
2. Tạo feature branch: `git checkout -b feature/TinhNangMoi`
3. Commit changes: `git commit -m 'Thêm tính năng mới'`
4. Push to branch: `git push origin feature/TinhNangMoi`
5. Tạo Pull Request

### Coding Standards

- **Frontend**: ESLint, Prettier
- **Backend**: Black, Flake8
- **Git**: Conventional commits

## 📄 Giấy Phép

Dự án này được phân phối dưới giấy phép MIT. Xem file `LICENSE` để biết thêm chi tiết.

## 👥 Tác Giả

- **Developer**: [Your Name]
- **Email**: your.email@example.com
- **GitHub**: https://github.com/yourusername

## 🙏 Lời Cảm Ơn

- **Next.js Team**: Framework tuyệt vời
- **Tailwind CSS**: Styling system mạnh mẽ
- **Flask Community**: Web framework Python
- **Docker**: Containerization platform

---

**BizFlow** - Giải pháp số hóa cho hộ kinh doanh Việt Nam! 🇻🇳
