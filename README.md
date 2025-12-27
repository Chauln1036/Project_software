# BizFlow - Ứng dụng quản lý kinh doanh Android

BizFlow là ứng dụng di động Android giúp quản lý kinh doanh một cách thông minh và hiệu quả.

## 🚀 Tính năng chính

- **Quản lý khách hàng**: Thêm, sửa, xóa thông tin khách hàng
- **Quản lý sản phẩm**: Theo dõi tồn kho và thông tin sản phẩm
- **Quản lý đơn hàng**: Tạo và theo dõi đơn hàng
- **Dashboard**: Xem tổng quan doanh nghiệp
- **Đa vai trò**: Admin, Chủ doanh nghiệp, Nhân viên

## 📱 Yêu cầu hệ thống

- **Android Studio** (phiên bản mới nhất)
- **Flutter SDK** 3.10+
- **Java JDK** 11+
- **Docker** (cho database)
- **Python** 3.8+ (cho backend)

## 🛠️ Cài đặt và chạy

### 1. Clone repository

```bash
git clone https://github.com/Chauln1036/Project_software.git
cd project_bizflow/bizflow-project
```

### 2. Khởi động Database

```bash
# Đảm bảo Docker Desktop đang chạy
docker-compose -f docker/docker-compose.yml up -d
```

### 3. Cài đặt Backend

```bash
cd backend
pip install -r requirements.txt
python setup.py  # Tạo database và demo data
python app.py    # Chạy backend server
```

### 4. Cài đặt Mobile App (Android)

```bash
cd mobile
flutter pub get
flutter run android  # Chạy trên thiết bị Android
```

## 👤 Tài khoản demo

| Username     | Password  | Vai trò          |
| ------------ | --------- | ---------------- |
| `admin`      | `demo123` | Administrator    |
| `nguyenvana` | `demo123` | Chủ doanh nghiệp |
| `hoangd`     | `demo123` | Nhân viên        |

## 📋 API Endpoints

- `POST /api/auth/login` - Đăng nhập
- `GET /api/customers/?business_id=1` - Danh sách khách hàng
- `GET /api/products/?business_id=1` - Danh sách sản phẩm
- `GET /api/orders/?business_id=1` - Danh sách đơn hàng

## 🏗️ Kiến trúc

```
bizflow-project/
├── backend/          # Python Flask API
├── mobile/           # Flutter Android App
└── docker/           # Database Docker setup
```

## 📱 Screenshots

(Sẽ cập nhật ảnh chụp màn hình)

## 🤝 Đóng góp

1. Fork project
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Liên hệ

Châu Long - chau.long@example.com

Project Link: [https://github.com/Chauln1036/Project_software](https://github.com/Chauln1036/Project_software)
