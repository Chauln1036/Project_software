# BizFlow Mobile App

Ứng dụng di động cho nền tảng BizFlow - giải pháp quản lý kinh doanh toàn diện cho hộ kinh doanh tại Việt Nam.

## 🚀 Tính năng

### 👤 Nhân viên (Employee)

- ✅ Đăng nhập hệ thống
- ✅ Nhận thông báo thời gian thực
- ✅ Xem dashboard cơ bản
- 🔄 Tạo đơn hàng (đang phát triển)

### 👨‍💼 Chủ cửa hàng (Owner)

- ✅ Tất cả quyền của Nhân viên
- 🔄 Quản lý sản phẩm, khách hàng, báo cáo (đang phát triển)

### 🤖 Tính năng AI

- 🔄 Nhận thông báo đơn hàng nháp từ AI (đang phát triển)
- 🔄 Xử lý giọng nói (đang phát triển)

## 🛠 Công nghệ sử dụng

- **Framework**: Flutter
- **State Management**: Provider
- **Networking**: HTTP package
- **Notifications**: flutter_local_notifications
- **Storage**: shared_preferences

## 📱 Cài đặt và chạy

### Yêu cầu hệ thống

- Flutter SDK (3.0.0+)
- Android Studio hoặc VS Code
- Device/Emulator Android/iOS

### 1. Cài đặt Flutter

```bash
# Kiểm tra Flutter đã cài đặt
flutter doctor

# Nếu chưa có, cài đặt từ: https://flutter.dev/docs/get-started/install
```

### 2. Cài đặt dependencies

```bash
cd bizflow_mobile
flutter pub get
```

### 3. Chạy ứng dụng

**Android Emulator:**

```bash
flutter run
```

**iOS Simulator:**

```bash
flutter run --device-id $(flutter devices | grep "iOS" | head -1 | awk '{print $4}')
```

**Device cụ thể:**

```bash
flutter devices  # Xem danh sách devices
flutter run -d <device_id>
```

## 🔧 Cấu hình

### API Endpoint

Mặc định kết nối đến: `http://10.0.2.2:5000` (Android emulator localhost)

Để thay đổi, chỉnh sửa trong `lib/services/auth_service.dart`:

```dart
static const String baseUrl = 'http://your-api-url:port';
```

### Permissions

Ứng dụng yêu cầu quyền:

- Internet access
- Notification (Android/iOS)

## 📊 Cấu trúc dự án

```
bizflow_mobile/
├── lib/
│   ├── models/          # Data models
│   ├── providers/       # State management
│   ├── screens/         # UI screens
│   ├── services/        # API calls & utilities
│   ├── widgets/         # Reusable widgets
│   └── main.dart        # App entry point
├── pubspec.yaml         # Dependencies
└── README.md
```

## 🎯 Demo Accounts

- **Employee**: username: `employee`, password: `demo123`
- **Owner**: username: `owner`, password: `demo123`

## 🔄 Development Status

- ✅ **Authentication**: Login/logout với API
- ✅ **Dashboard**: UI cơ bản với thống kê
- ✅ **Notifications**: Hỗ trợ push notifications
- 🔄 **Orders**: Đang phát triển
- 🔄 **AI Features**: Đang phát triển
- 🔄 **Offline Mode**: Đang phát triển

## 🚀 Build Release

### Android APK

```bash
flutter build apk --release
```

### iOS (macOS only)

```bash
flutter build ios --release
```

## 🐛 Troubleshooting

### Flutter issues

```bash
flutter clean
flutter pub get
flutter run
```

### Android emulator network

- Sử dụng `10.0.2.2` cho localhost từ Android emulator
- Sử dụng `192.168.x.x` cho physical device

### iOS permissions

- Cần cấu hình notification permissions trong iOS

## 🤝 Đóng góp

1. Fork project
2. Tạo feature branch
3. Commit changes
4. Push và tạo Pull Request

---

_Tính năng đang được phát triển. Một số features có thể chưa hoạt động đầy đủ._
