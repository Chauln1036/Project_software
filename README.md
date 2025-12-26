# BizFlow - Nền tảng hỗ trợ chuyển đổi số cho hộ kinh doanh

## English: Platform to support digital transformation for household businesses

## Vietnamese: Nền tảng hỗ trợ chuyển đổi số cho hộ kinh doanh

BizFlow là một nền tảng toàn diện được thiết kế đặc biệt cho các hộ kinh doanh tại Việt Nam, giúp số hóa các quy trình kinh doanh thủ công. Nền tảng tích hợp giao diện với trợ lý AI có khả năng hiểu ngôn ngữ tự nhiên (qua văn bản hoặc giọng nói) để tự động tạo bản nháp đơn hàng và điền dữ liệu vào mẫu.

## 📋 Mục lục

- [Giới thiệu](#-giới-thiệu)
- [Tính năng chính](#-tính-năng-chính)
- [Kiến trúc hệ thống](#-kiến-trúc-hệ-thống)
- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Yêu cầu hệ thống](#-yêu-cầu-hệ-thống)
- [Cài đặt và chạy](#-cài-đặt-và-chạy)
- [Upload lên GitHub](#-upload-lên-github)
- [API Documentation](#-api-documentation)
- [Đóng góp](#-đóng-góp)
- [Giấy phép](#-giấy-phép)

## 🎯 Giới thiệu

Tại Việt Nam, hộ kinh doanh đóng vai trò quan trọng trong nền kinh tế địa phương, đặc biệt trong các lĩnh vực truyền thống như vật liệu xây dựng, cung cấp thiết bị xây dựng và bán lẻ đồ sắt. Tuy nhiên, phần lớn các doanh nghiệp này vẫn vận hành bằng quy trình thủ công hoàn toàn.

BizFlow giải quyết vấn đề này bằng cách cung cấp:

- **Tự động hóa quy trình kinh doanh** thông qua trợ lý AI
- **Quản lý đơn hàng thông minh** với khả năng hiểu ngôn ngữ tự nhiên
- **Giao diện thân thiện** phù hợp với người dùng có kỹ năng số hạn chế
- **Tuân thủ pháp luật** với báo cáo kế toán theo Thông tư 88/2021/TT-BTC

## 🚀 Tính năng chính

### 👤 Nhân viên (Employee)

- ✅ Đăng nhập hệ thống
- ✅ Tạo đơn hàng tại quầy nhanh (tìm sản phẩm, thêm số lượng, thêm thông tin khách hàng)
- ✅ In hóa đơn bán hàng
- ✅ Ghi nợ cho khách hàng đã đăng ký
- ✅ Nhận thông báo thời gian thực cho đơn hàng mới
- ✅ Xem và xác nhận "Đơn hàng nháp" được tạo bởi AI

### 👨‍💼 Chủ cửa hàng (Owner)

- ✅ Tất cả quyền của Nhân viên
- ✅ Quản lý danh mục sản phẩm (tên, giá, đơn vị đo lường đa dạng)
- ✅ Quản lý tồn kho (nhập hàng mới, xem mức tồn kho)
- ✅ Quản lý khách hàng (thông tin, lịch sử mua hàng, nợ)
- ✅ Xem báo cáo và phân tích (doanh thu hàng ngày/tháng, sản phẩm bán chạy, nợ chưa trả)
- ✅ Quản lý tài khoản nhân viên

### 👑 Quản trị viên (Administrator)

- ✅ Quản lý tài khoản chủ cửa hàng
- ✅ Xem báo cáo, phân tích và phản hồi
- ✅ Quản lý giá gói dịch vụ
- ✅ Cập nhật cấu hình hệ thống và mẫu báo cáo tài chính

### 🤖 Hệ thống (System)

- ✅ Chuyển đổi ngôn ngữ tự nhiên thành đơn hàng nháp
- ✅ Tự động thực hiện kế toán cho mọi giao dịch bán hàng

## 🏗 Kiến trúc hệ thống

```
BizFlow/
├── Flask-CleanArchitecture/     # Backend API (Python Flask)
│   ├── src/
│   │   ├── domain/             # Business Logic Layer
│   │   ├── infrastructure/     # Data Access Layer
│   │   ├── services/          # Application Services
│   │   └── api/               # API Controllers
│   └── requirements.txt
│
├── wireframe_bizflow/          # Frontend Web (Next.js)
│   ├── src/
│   │   ├── components/        # React Components
│   │   ├── app/              # Next.js App Router
│   │   └── lib/              # Utilities
│   └── package.json
│
└── README.md
```

## 🛠 Công nghệ sử dụng

### Backend (Flask-CleanArchitecture)

- **Framework**: Python Flask với Clean Architecture
- **Database**: MySQL (transactional), PostgreSQL (analytics/AI)
- **ORM**: SQLAlchemy
- **AI Integration**:
  - RAG: ChromaDB, text-embedding-3-small
  - LLM: OpenAI API / Gemini
  - Speech-to-Text: Google Speech-to-Text / Whisper
- **Caching**: Redis
- **API Documentation**: Swagger/OpenAPI

### Frontend (wireframe_bizflow)

- **Framework**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI, Radix UI
- **State Management**: Tanstack Query, React Hook Form
- **Charts**: Recharts
- **Icons**: Lucide React

### Mobile (Future)

- **Framework**: Flutter
- **Features**: Push Notifications

## 💻 Yêu cầu hệ thống

### Backend

- Python 3.8+
- MySQL 8.0+
- PostgreSQL 13+
- Redis (optional)

### Frontend

- Node.js 18.17+
- npm hoặc yarn

### Mobile

- Flutter SDK
- Android Studio / Xcode

## 🚀 Cài đặt và chạy

### 1. Chuẩn bị Database

**MySQL Setup với Docker:**

```bash
# Pull MySQL image
docker pull mysql:8.0

# Run MySQL container
docker run --name bizflow-mysql -e MYSQL_ROOT_PASSWORD=rootpassword -e MYSQL_DATABASE=bizflow_db -p 3306:3306 -d mysql:8.0

# Kiểm tra container
docker ps
```

**PostgreSQL Setup với Docker (cho AI data):**

```bash
# Pull PostgreSQL image
docker pull postgres:13

# Run PostgreSQL container
docker run --name bizflow-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=bizflow_ai -p 5432:5432 -d postgres:13
```

### 2. Backend Setup

```bash
# Di chuyển vào thư mục backend
cd Flask-CleanArchitecture/src

# Tạo virtual environment
python -m venv venv

# Kích hoạt virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Cài đặt dependencies
pip install -r requirements.txt

# Tạo file .env
cp .env.example .env
# Chỉnh sửa .env với thông tin database

# Tạo database
python setup_db.py

# Chạy backend server
python app.py
```

**File .env cho backend:**

```env
# Flask settings
FLASK_ENV=development
SECRET_KEY=your_secret_key

# MySQL settings
DB_USER=root
DB_PASSWORD=rootpassword
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=bizflow_db

DATABASE_URI=mysql+pymysql://root:rootpassword@127.0.0.1:3306/bizflow_db
```

Backend sẽ chạy tại: http://localhost:5000
API Documentation: http://localhost:5000/docs

### 3. Frontend Setup

```bash
# Di chuyển vào thư mục frontend
cd wireframe_bizflow

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

Frontend sẽ chạy tại: http://localhost:3000

### 4. Mobile App (Flutter - Tương lai)

```bash
# Di chuyển vào thư mục mobile (khi hoàn thành)
cd mobile_app

# Cài đặt dependencies
flutter pub get

# Chạy trên emulator/device
flutter run
```

## 📤 Upload lên GitHub

### Bước 1: Tạo repository trên GitHub

1. Truy cập https://github.com
2. Click "New repository"
3. Đặt tên: `BizFlow` hoặc `bizflow-platform`
4. Chọn Public/Private theo nhu cầu
5. **Không** tích chọn "Add a README file"
6. Click "Create repository"

### Bước 2: Upload code lên GitHub

```bash
# Khởi tạo git repository (nếu chưa có)
git init

# Thêm tất cả files
git add .

# Commit changes
git commit -m "Initial commit: BizFlow platform with backend and frontend"

# Thêm remote repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push lên GitHub
git push -u origin main
```

### Bước 3: Tạo .gitignore

Tạo file `.gitignore` trong thư mục gốc:

```gitignore
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
venv/
ENV/
env.bak/
venv.bak/

# Node.js
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.next/
out/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Database
*.db
*.sqlite3

# Docker
docker-compose.override.yml
```

## 📚 API Documentation

### Authentication

```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
```

### Products

```
GET    /api/products
POST   /api/products
GET    /api/products/{id}
PUT    /api/products/{id}
DELETE /api/products/{id}
```

### Orders

```
GET    /api/orders
POST   /api/orders
GET    /api/orders/{id}
PUT    /api/orders/{id}
POST   /api/orders/{id}/confirm
```

### AI Features

```
POST   /api/ai/process-text
POST   /api/ai/process-voice
GET    /api/draft-orders
POST   /api/draft-orders/{id}/confirm
```

## 🤝 Đóng góp

1. Fork project
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📄 Giấy phép

Dự án này được phát triển cho mục đích giáo dục và sử dụng giấy phép MIT.

## 🙏 Lời cảm ơn

- Giáo viên hướng dẫn và đội ngũ phát triển
- Cộng đồng open source
- Các doanh nghiệp hộ kinh doanh tại Việt Nam

---

**Lưu ý**: Đây là phiên bản phát triển của BizFlow. Một số tính năng AI và mobile app đang trong quá trình hoàn thiện.
