# BizFlow Mobile App

Ứng dụng di động cho hệ thống quản lý kinh doanh BizFlow, giúp nhân viên và chủ cửa hàng quản lý đơn hàng, khách hàng và theo dõi doanh thu mọi lúc mọi nơi.

## 🚀 Tính năng

### 👤 Quản lý tài khoản

- Đăng nhập/Đăng xuất an toàn
- Lưu trữ thông tin đăng nhập
- Phân quyền theo vai trò (Admin, Owner, Employee)

### 📦 Quản lý đơn hàng

- Xem danh sách đơn hàng
- Tạo đơn hàng mới
- Theo dõi trạng thái đơn hàng
- Xem chi tiết đơn hàng

### 👥 Quản lý khách hàng

- Danh sách khách hàng
- Thông tin liên hệ
- Lịch sử mua hàng

### 📊 Thống kê & Báo cáo

- Doanh thu theo ngày/tháng
- Số lượng đơn hàng
- Báo cáo tổng quan

## 🛠 Công nghệ sử dụng

- **Flutter**: Framework cross-platform
- **Dart**: Ngôn ngữ lập trình
- **Provider**: State management
- **HTTP**: API communication
- **Shared Preferences**: Local storage
- **Local Notifications**: Push notifications

## 📋 Yêu cầu hệ thống

- **Flutter**: 3.0+
- **Dart**: 2.19+
- **Android**: API 21+ (Android 5.0+)
- **iOS**: 11.0+

## 🚀 Cài đặt & Chạy

### 1. Cài đặt Flutter

```bash
# Download Flutter SDK
git clone https://github.com/flutter/flutter.git -b stable

# Add to PATH
export PATH="$PATH:`pwd`/flutter/bin"

# Verify installation
flutter doctor
```

### 2. Clone & Setup

```bash
cd bizflow/mobile
flutter pub get
```

### 3. Chạy ứng dụng

#### Android

```bash
flutter run
```

#### iOS (macOS only)

```bash
flutter run
```

#### Web (for testing)

```bash
flutter run -d chrome
```

## 🔧 Cấu hình API

Ứng dụng kết nối với backend API Flask. Cấu hình trong `lib/services/auth_service.dart`:

```dart
static const String baseUrl = 'http://10.0.2.2:9999'; // Android emulator
// static const String baseUrl = 'http://localhost:9999'; // iOS simulator
// static const String baseUrl = 'http://YOUR_IP:9999'; // Physical device
```

## 📱 Screenshots

### Login Screen

Màn hình đăng nhập với giao diện thân thiện

### Dashboard

Dashboard chính với thống kê và danh sách đơn hàng

### Order Management

Quản lý đơn hàng với chi tiết đầy đủ

## 🏗️ Cấu trúc Project

```
lib/
├── main.dart                 # Entry point
├── models/
│   └── user.dart            # User model
├── providers/
│   ├── auth_provider.dart   # Authentication state
│   └── order_provider.dart  # Order management
├── screens/
│   ├── login_screen.dart    # Login page
│   └── dashboard_screen.dart # Main dashboard
├── services/
│   ├── auth_service.dart    # API calls for auth
│   └── notification_service.dart # Push notifications
└── widgets/                 # Reusable UI components
```

## 🔐 API Endpoints

### Authentication

- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/logout` - Đăng xuất

### Orders

- `GET /api/orders` - Lấy danh sách đơn hàng
- `POST /api/orders` - Tạo đơn hàng mới
- `PUT /api/orders/:id` - Cập nhật đơn hàng
- `DELETE /api/orders/:id` - Xóa đơn hàng

## 🐛 Xử lý lỗi

### Network Issues

- Kiểm tra kết nối internet
- Verify API server đang chạy
- Check IP address trong auth_service.dart

### Authentication Issues

- Đảm bảo backend đang chạy trên port 9999
- Kiểm tra credentials
- Clear app data nếu cần

## 🚀 Build Production

### Android APK

```bash
flutter build apk --release
```

### iOS (macOS only)

```bash
flutter build ios --release
```

### Web

```bash
flutter build web --release
```

## 🤝 Đóng góp

1. Fork project
2. Tạo feature branch
3. Commit changes
4. Push và tạo Pull Request

## 📄 License

MIT License - Xem LICENSE file

---

**BizFlow Mobile** - Quản lý kinh doanh mọi lúc mọi nơi! 📱
