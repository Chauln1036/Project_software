# BizFlow Mobile - Android App

Ứng dụng di động Android cho hệ thống quản lý kinh doanh BizFlow.

## 📱 Tính năng

- **Đăng nhập**: Xác thực người dùng với JWT
- **Dashboard**: Tổng quan đơn hàng và doanh thu
- **Quản lý khách hàng**: Xem, thêm, sửa, xóa khách hàng
- **Quản lý sản phẩm**: Xem danh sách sản phẩm và tồn kho
- **Tạo đơn hàng**: Đơn hàng mới với chi tiết sản phẩm
- **Đa vai trò**: Hỗ trợ Admin, Owner, Employee

## 🛠️ Yêu cầu

- **Flutter SDK**: 3.10.0+
- **Android Studio**: Arctic Fox trở lên
- **Android SDK**: API 21+ (Android 5.0+)
- **Backend API**: Chạy trên localhost:9999

## 🚀 Cài đặt

### 1. Cài đặt Flutter

```bash
# Kiểm tra Flutter
flutter doctor

# Cập nhật Flutter
flutter upgrade
```

### 2. Clone và cài đặt

```bash
cd mobile
flutter pub get
```

### 3. Chạy trên Android device/emulator

```bash
# Kết nối Android device hoặc khởi động emulator
flutter devices

# Chạy app
flutter run android
```

## 🔧 Cấu hình

### Backend API URL

App sử dụng `10.0.2.2:9999` cho Android emulator (địa chỉ localhost của máy host).

Nếu chạy trên physical device:

- Thay đổi IP trong `lib/services/` thành IP LAN của máy development
- Ví dụ: `192.168.1.100:9999`

## 📁 Cấu trúc project

```
mobile/
├── android/              # Android native code
├── lib/                  # Flutter Dart code
│   ├── main.dart        # Entry point
│   ├── models/          # Data models
│   ├── providers/       # State management
│   ├── screens/         # UI screens
│   ├── services/        # API services
│   └── widgets/         # Reusable widgets
├── pubspec.yaml         # Dependencies
└── README.md
```

## 🧪 Test accounts

| Username   | Password | Role          |
| ---------- | -------- | ------------- |
| admin      | demo123  | Administrator |
| nguyenvana | demo123  | Owner         |
| hoangd     | demo123  | Employee      |

## 🐛 Troubleshooting

### Build issues

```bash
# Clean build
flutter clean
flutter pub get

# Rebuild Android
cd android
./gradlew clean
cd ..
flutter build apk
```

### Network issues

- Đảm bảo backend đang chạy trên port 9999
- Kiểm tra firewall không block port
- Với physical device: sử dụng IP LAN thay vì 10.0.2.2

### Permission issues

```xml
<!-- AndroidManifest.xml -->
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

## 📱 Screenshots

(Sẽ cập nhật)

## 🤝 Đóng góp

1. Tạo issue để báo bug hoặc đề xuất feature
2. Fork và tạo pull request
3. Follow Flutter code style guidelines

## 📄 License

MIT License - Xem LICENSE file
