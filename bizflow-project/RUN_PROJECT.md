# 🚀 Hướng Dẫn Chạy Dự Án BizFlow

## 📋 Tổng Quan

BizFlow là hệ thống quản lý kinh doanh đa nền tảng bao gồm:

- **Web App**: Next.js Frontend + Flask Backend
- **Mobile App**: Flutter (Android/iOS)
- **Database**: MySQL với Docker

## ⚡ Chạy Nhanh (Tất Cả Trong 5 Phút)

### 1. Khởi Động Database

```bash
cd bizflow-project
docker-compose -f docker/docker-compose.yml up -d
```

### 2. Cài Đặt & Chạy Backend

```bash
cd backend
pip install -r requirements.txt
python setup.py
python app.py
```

### 3. Cài Đặt & Chạy Frontend (Terminal Mới)

```bash
cd frontend
npm install
npm run dev
```

### 4. Cài Đặt & Chạy Mobile App (Terminal Mới)

```bash
cd mobile
flutter pub get
flutter run
```

## 🌐 Truy Cập Ứng Dụng

### Web Application

- **URL**: http://localhost:3000
- **Login**: admin / demo123

### Backend API

- **URL**: http://localhost:9999
- **Docs**: http://localhost:9999/docs

### Mobile App

- Chạy trên thiết bị Android/iOS hoặc emulator

## 📱 Tài Khoản Demo

| Vai Trò  | Username   | Password |
| -------- | ---------- | -------- |
| Admin    | admin      | demo123  |
| Owner    | nguyenvana | demo123  |
| Employee | hoangd     | demo123  |

## 🔧 Ports Sử Dụng

| Service  | Port | URL                   |
| -------- | ---- | --------------------- |
| Frontend | 3000 | http://localhost:3000 |
| Backend  | 9999 | http://localhost:9999 |
| MySQL    | 3306 | localhost:3306        |
| Redis    | 6379 | localhost:6379        |

## 🛠 Troubleshooting

### Database Không Khởi Động

```bash
docker-compose -f docker/docker-compose.yml down
docker-compose -f docker/docker-compose.yml up -d
```

### Backend Lỗi

```bash
cd backend
pip install -r requirements.txt
python app.py
```

### Frontend Lỗi

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Mobile Lỗi

```bash
cd mobile
flutter clean
flutter pub get
flutter run
```

## 📊 Kiểm Tra Status

### Database Health

```bash
docker ps
docker logs bizflow_mysql
```

### Backend Health

Truy cập: http://localhost:9999/docs

### Frontend Health

Truy cập: http://localhost:3000

## 🎯 Workflow Phát Triển

1. **Database**: Docker Compose
2. **Backend**: Python Flask
3. **Frontend**: Next.js
4. **Mobile**: Flutter
5. **API**: RESTful với JWT

---

**BizFlow Ready! 🎉**
