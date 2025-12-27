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
- **ESLint**: Code quality & consistency

### Backend

- **Flask**: Python web framework
- **Clean Architecture**: Kiến trúc sạch, dễ maintain
- **SQLAlchemy**: ORM cho database
- **JWT**: Authentication & authorization

### Database

- **SQLite**: Primary database (development)
- **MySQL/PostgreSQL**: Production databases
- **Docker**: Containerized database services

## 📋 Yêu Cầu Hệ Thống

- **Node.js**: 18.17+
- **Python**: 3.8+
- **Docker**: Latest version (optional)
- **Git**: Latest version

## 🚀 Cài Đặt & Chạy

### 1. Chuẩn Bị Môi Trường

```bash
# Clone project
git clone <repository-url>
cd project_bizflow
```

### 2. Cấu Hình Database

**Quan trọng:** BizFlow yêu cầu cấu hình database rõ ràng.

```bash
# Chạy setup script để chọn loại database
cd bizflow-project
python setup.py
```

**Lựa chọn:**

- SQLite (đơn giản nhất - khuyến nghị)
- MySQL/PostgreSQL với Docker
- MySQL/PostgreSQL local

### 3. Khởi Động Database (nếu dùng Docker)

```bash
cd bizflow-project/docker
docker-compose up -d
```

### 4. Chạy Backend API

```bash
cd bizflow-project/backend
python app.py
```

**API chạy tại:** http://localhost:9999

### 5. Chạy Frontend Web

```bash
cd bizflow-project/frontend
npm install
npm run dev
```

**Web app chạy tại:** http://localhost:3000

## 🔐 Tài Khoản Demo

Sau khi setup xong, sử dụng tài khoản sau để đăng nhập:

| Username   | Password | Vai Trò        |
| ---------- | -------- | -------------- |
| admin      | demo123  | Administrator  |
| nguyenvana | demo123  | Business Owner |
| hoangd     | demo123  | Employee       |

## 📖 API Documentation

### Authentication

```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
```

### Products

```
GET  /api/products
POST /api/products
PUT  /api/products/:id
DELETE /api/products/:id
```

### Orders

```
GET  /api/orders
POST /api/orders
PUT  /api/orders/:id
DELETE /api/orders/:id
```

### Employees

```
GET  /api/employees
POST /api/employees
PUT  /api/employees/:id
DELETE /api/employees/:id
```

## 🗄️ Database Schema

### Core Tables

- `users`: Thông tin người dùng & authentication
- `business`: Thông tin doanh nghiệp
- `products`: Danh mục sản phẩm
- `orders`: Đơn hàng
- `order_items`: Chi tiết đơn hàng
- `customers`: Thông tin khách hàng
- `employees`: Quản lý nhân sự

## 🔧 Development

### Project Structure

```
bizflow-project/
├── backend/                    # Flask REST API
│   ├── app.py                 # Main Flask application
│   ├── config.py              # Database & environment config
│   ├── api/                   # API routes & controllers
│   ├── domain/                # Business logic & models
│   └── infrastructure/        # Database & external services
├── frontend/                  # Next.js Web Application
│   ├── src/
│   │   ├── app/              # Next.js App Router
│   │   ├── components/       # React components
│   │   ├── lib/              # Utilities & API client
│   │   └── types/            # TypeScript definitions
│   └── package.json
├── mobile/                    # Flutter Mobile App
└── docker/                    # Infrastructure & Databases
```

### Build Commands

```bash
# Frontend build check
cd bizflow-project/frontend
npm run build

# Backend test
cd bizflow-project/backend
python -c "from config import Config; print('Config OK')"
```

## 🚀 Production Deployment

### Docker Deployment

```bash
# Build & run toàn bộ hệ thống
cd bizflow-project/docker
docker-compose -f docker-compose.prod.yml up -d
```

### Manual Deployment

1. **Database**: Chạy MySQL/PostgreSQL server
2. **Backend**: Deploy Flask app với Gunicorn
3. **Frontend**: Build Next.js và serve static files

## 🤝 Đóng Góp

1. Fork project
2. Tạo feature branch: `git checkout -b feature/TinhNangMoi`
3. Commit changes: `git commit -m 'Thêm tính năng mới'`
4. Push to branch: `git push origin feature/TinhNangMoi`
5. Tạo Pull Request

## 📄 Giấy Phép

Dự án này được phân phối dưới giấy phép MIT.

---

**BizFlow** - Giải pháp số hóa cho hộ kinh doanh Việt Nam! 🇻🇳 🚀
