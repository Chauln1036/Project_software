# BizFlow - Fullstack Business Management System

Một hệ thống quản lý doanh nghiệp toàn diện với giao diện web hiện đại và ứng dụng di động.

## 🏗️ Kiến trúc

```
bizflow-project/
├── backend/                # Flask REST API
│   ├── app.py             # Main Flask app
│   ├── config.py          # Database & app config
│   ├── requirements.txt   # Python dependencies
│   ├── api/               # API routes & controllers
│   ├── domain/            # Business logic & models
│   ├── infrastructure/    # Database & external services
│   └── services/          # Business services
├── frontend/              # Next.js Web Application
│   ├── src/
│   │   ├── app/          # Next.js App Router
│   │   ├── components/   # React components
│   │   ├── lib/          # Utilities & API client
│   │   └── types/        # TypeScript types
│   ├── package.json
│   └── next.config.js
├── mobile/                # Flutter Mobile App
│   ├── lib/
│   ├── pubspec.yaml
│   └── README.md
├── docker/                # Infrastructure & Databases
│   ├── docker-compose.yml
│   └── init-scripts/
└── docs/                  # Documentation
```

## 🚀 Cài đặt & Chạy

### 1. Chuẩn bị môi trường

```bash
# Clone project (sau khi tổ chức lại)
cd bizflow-project

# Cài đặt Python (nếu chưa có)
# Download từ: https://python.org

# Cài đặt Node.js (nếu chưa có)
# Download từ: https://nodejs.org

# Cài đặt Flutter (cho mobile app)
# Download từ: https://flutter.dev
```

### 2. Cấu hình Database

**Quan trọng:** BizFlow yêu cầu cấu hình database rõ ràng (giống production).

```bash
# Chạy setup script
python setup.py
```

Setup sẽ hỏi bạn chọn loại database:

- **SQLite**: Đơn giản nhất, file-based
- **MySQL/PostgreSQL với Docker**: Professional
- **MySQL/PostgreSQL local**: Nếu đã cài sẵn

### 3. Khởi động Database (nếu dùng Docker)

```bash
# Nếu chọn MySQL/PostgreSQL Docker
cd docker
docker-compose up -d
```

### 4. Chạy Backend API

```bash
cd backend

# Cài đặt dependencies
pip install -r requirements.txt

# Chạy Flask server
python app.py
```

Backend sẽ chạy tại: `http://localhost:9999`

- API Docs: `http://localhost:9999/docs`
- Swagger UI: `http://localhost:9999/docs/`

### 5. Chạy Frontend Web

```bash
cd frontend

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

Frontend sẽ chạy tại: `http://localhost:3000`

### 5. Chạy Mobile App (Optional)

```bash
cd mobile

# Cài đặt dependencies
flutter pub get

# Chạy trên emulator/device
flutter run
```

## 🔐 Tài khoản Demo

Sau khi setup xong, sử dụng tài khoản sau để đăng nhập:

| Username | Password | Role           |
| -------- | -------- | -------------- |
| admin    | demo123  | Administrator  |
| owner    | demo123  | Business Owner |
| employee | demo123  | Employee       |

## 📊 Tính năng

### 🏪 Quản lý Cửa hàng

- Quản lý sản phẩm và tồn kho
- Quản lý khách hàng và đơn hàng
- Báo cáo doanh thu và lợi nhuận

### 👥 Quản lý Nhân sự

- Hồ sơ nhân viên
- Chấm công và nghỉ phép
- Đánh giá hiệu suất
- Quản lý dự án

### 📱 Ứng dụng Di động

- Giao diện thân thiện cho nhân viên
- Theo dõi đơn hàng real-time
- Quản lý ca làm việc

## 🛠️ Công nghệ sử dụng

### Backend

- **Framework**: Flask (Python)
- **Database**: MySQL/SQLite
- **Authentication**: JWT
- **API**: RESTful
- **Docs**: Swagger/OpenAPI

### Frontend

- **Framework**: Next.js 14 (React)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **State Management**: React Hooks

### Mobile

- **Framework**: Flutter (Dart)
- **Platform**: iOS & Android

### Infrastructure

- **Container**: Docker & Docker Compose
- **Cache**: Redis
- **Reverse Proxy**: Nginx (production)

## 🔄 API Endpoints

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
```

### Orders

```
GET  /api/orders
POST /api/orders
PUT  /api/orders/:id
```

### Employees

```
GET  /api/employees
POST /api/employees
PUT  /api/employees/:id
```

## 🚢 Deployment

### Production Setup

1. **Environment Variables**:

```bash
# backend/.env
DATABASE_URI=mysql+pymysql://user:pass@db:3306/bizflow_prod
SECRET_KEY=your-secret-key
DEBUG=False

# frontend/.env.local
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

2. **Docker Production**:

```bash
# Build images
docker build -t bizflow-backend ./backend
docker build -t bizflow-frontend ./frontend

# Run with docker-compose.prod.yml
docker-compose -f docker/docker-compose.prod.yml up -d
```

3. **Reverse Proxy** (Nginx):

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://frontend:3000;
    }

    location /api {
        proxy_pass http://backend:9999;
    }
}
```

## 📈 Roadmap

### Phase 1 (Current) ✅

- [x] Basic CRUD operations
- [x] User authentication
- [x] Web dashboard
- [x] Database integration

### Phase 2 (Next)

- [ ] Mobile app completion
- [ ] Real-time notifications
- [ ] Advanced reporting
- [ ] Multi-tenancy support

### Phase 3 (Future)

- [ ] AI-powered insights
- [ ] IoT device integration
- [ ] Multi-language support
- [ ] Cloud deployment

## 🤝 Đóng góp

1. Fork project
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Liên hệ

- **Email**: contact@bizflow.vn
- **Website**: https://bizflow.vn
- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)

---

**BizFlow** - Giải pháp quản lý doanh nghiệp toàn diện cho tương lai! 🚀
