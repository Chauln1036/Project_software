# BizFlow (Community)

Một ứng dụng quản lý kinh doanh toàn diện được xây dựng bằng Next.js, được thiết kế để số hóa hoạt động của các doanh nghiệp nhỏ tại Việt Nam. Nền tảng này giúp chủ cửa hàng quản lý hàng tồn kho, đơn hàng, khách hàng, nhân viên và nhiều hơn nữa thông qua giao diện bảng điều khiển trực quan.

## 🌟 Tính năng

### Dành cho Chủ cửa hàng

- **Tổng quan Bảng điều khiển**: Thông tin thời gian thực về doanh số, hàng tồn kho và hiệu suất
- **Quản lý Đơn hàng**: Tạo và quản lý đơn hàng của khách hàng thủ công hoặc thông qua trợ giúp AI
- **Kiểm soát Hàng tồn kho**: Theo dõi sản phẩm, mức tồn kho và quản lý nhà cung cấp
- **Quản lý Khách hàng**: Duy trì cơ sở dữ liệu khách hàng với lịch sử mua hàng
- **Quản lý Nhân viên**: Giám sát nhân viên, vai trò và quyền hạn
- **Báo cáo & Phân tích**: Tạo báo cáo kinh doanh và phân tích

### Dành cho Nhân viên

- **Tạo Đơn hàng**: Xử lý đơn hàng của khách hàng hiệu quả
- **Bản nháp Đơn hàng AI**: Xem xét và xác nhận bản nháp đơn hàng được tạo bởi AI
- **Bảng điều khiển Cơ bản**: Truy cập các công cụ thiết yếu cho hoạt động hàng ngày

### Dành cho Quản trị viên

- **Quản trị Hệ thống**: Quản lý tài khoản doanh nghiệp và gói dịch vụ
- **Quản lý Người dùng**: Giám sát tất cả người dùng trên nền tảng
- **Cài đặt Hệ thống**: Cấu hình cài đặt trên toàn bộ nền tảng

## 🛠 Công nghệ sử dụng

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form
- **Build Tool**: Next.js (thay thế Vite)

## 📋 Yêu cầu hệ thống

- Node.js 18.17 hoặc phiên bản mới hơn
- Trình quản lý gói npm hoặc yarn

## 🚀 Bắt đầu

### 1. Sao chép kho mã nguồn

```bash
git clone https://github.com/Chauln1036/src.git
cd src
```

### 2. Cài đặt các phụ thuộc

```bash
npm install
```

### 3. Chạy máy chủ phát triển

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) trong trình duyệt để xem ứng dụng.

### 4. Xây dựng cho sản xuất

```bash
npm run build
npm start
```

## 🔐 Tài khoản Demo

Ứng dụng bao gồm các tùy chọn đăng nhập demo để thử nghiệm các vai trò người dùng khác nhau:

- **Nhân viên**: Truy cập tạo đơn hàng và quản lý cơ bản
- **Chủ cửa hàng**: Truy cập đầy đủ các tính năng quản lý kinh doanh
- **Quản trị viên**: Quản trị hệ thống và quản lý nền tảng

Chỉ cần nhấp vào các nút đăng nhập demo trên trang đăng nhập để khám phá trải nghiệm người dùng khác nhau.

## 📁 Cấu trúc dự án

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Layout gốc
│   ├── page.tsx          # Trang chủ
│   └── globals.css       # Kiểu toàn cục
├── components/            # Các component React
│   ├── ui/               # Các component UI có thể tái sử dụng
│   ├── admin/            # Các component bảng điều khiển admin
│   ├── owner/            # Các component chủ cửa hàng
│   ├── employee/         # Các component nhân viên
│   └── common/           # Các component chia sẻ
├── data/                 # Dữ liệu mock và hằng số
├── lib/                  # Các hàm tiện ích
├── types/                # Định nghĩa kiểu TypeScript
└── styles/               # Kiểu bổ sung
```

## 🎨 Thiết kế

Dự án này được dựa trên thiết kế Figma có sẵn tại:
[https://www.figma.com/design/tl27zItcRq8rohDAkGpon9/BizFlow--Community-](https://www.figma.com/design/tl27zItcRq8rohDAkGpon9/BizFlow--Community-)

## 🤝 Đóng góp

1. Fork kho mã nguồn
2. Tạo nhánh tính năng của bạn (`git checkout -b feature/TinhNangTuyetVoi`)
3. Commit các thay đổi của bạn (`git commit -m 'Thêm tính năng tuyệt vời'`)
4. Push lên nhánh (`git push origin feature/TinhNangTuyetVoi`)
5. Mở Pull Request

## 📄 Giấy phép

Dự án này được cấp phép theo Giấy phép MIT - xem tệp [LICENSE](LICENSE) để biết chi tiết.

## 🙏 Lời cảm ơn

- Thiết kế gốc bởi đội ngũ BizFlow
- Được xây dựng với các thực tiễn hiện đại của React và Next.js
- Được điều chỉnh cho nhu cầu của doanh nghiệp nhỏ Việt Nam
