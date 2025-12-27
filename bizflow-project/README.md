# BizFlow Project

Dự án BizFlow - Hệ thống quản lý kinh doanh với ứng dụng Android và backend API.

## 🏗️ Tổng quan kiến trúc

```
bizflow-project/
├── backend/          # Python Flask REST API
│   ├── api/         # API controllers và routes
│   ├── domain/      # Business logic
│   ├── infrastructure/ # Database và external services
│   └── requirements.txt
├── mobile/          # Flutter Android App (chỉ Android)
│   ├── android/     # Android native code
│   ├── lib/         # Flutter Dart code
│   └── pubspec.yaml
└── docker/          # Database Docker setup
    └── docker-compose.yml
```

## 🚀 Quick Start

### 1. Khởi động Database

```bash
cd docker
docker-compose up -d
```

### 2. Chạy Backend

```bash
cd backend
pip install -r requirements.txt
python setup.py
python app.py
```

### 3. Chạy Mobile App (Android)

```bash
cd mobile
flutter pub get
flutter run android
```

## 📱 Demo Accounts

| Username   | Password | Role     |
| ---------- | -------- | -------- |
| admin      | demo123  | Admin    |
| nguyenvana | demo123  | Owner    |
| hoangd     | demo123  | Employee |

## 📋 API Documentation

Backend chạy trên `http://localhost:9999`

- `POST /api/auth/login` - Đăng nhập
- `GET /api/customers/?business_id=1` - Khách hàng
- `GET /api/products/?business_id=1` - Sản phẩm
- `GET /api/orders/?business_id=1` - Đơn hàng

## 🛠️ Tech Stack

- **Backend**: Python Flask + SQLAlchemy + MySQL
- **Mobile**: Flutter + Dart (Android only)
- **Database**: MySQL 8.0 (Docker)
- **Authentication**: JWT

## 📱 Mobile App Features

- ✅ Đăng nhập với JWT
- ✅ Dashboard với thống kê
- ✅ Quản lý khách hàng (CRUD)
- ✅ Xem sản phẩm và tồn kho
- ✅ Tạo đơn hàng
- ✅ Đa vai trò user

## 🔧 Development

### Prerequisites

- Python 3.8+
- Flutter 3.10+
- Android Studio
- Docker Desktop

### Environment Setup

1. Clone repo
2. Start database: `docker-compose up -d`
3. Install backend deps: `pip install -r backend/requirements.txt`
4. Install mobile deps: `flutter pub get`
5. Run backend: `python backend/app.py`
6. Run mobile: `flutter run android`

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License.
