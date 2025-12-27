#!/usr/bin/env python3
"""
Setup script for BizFlow
Configure database and environment settings
"""

import os
import sys

def main():
    print("🚀 BizFlow Setup")
    print("=" * 50)

    print("\n📊 Cấu hình database MySQL với Docker")

    # MySQL Docker
    db_uri = "mysql+pymysql://bizflow_user:bizflow_pass@127.0.0.1:3306/bizflow_db"
    print("✅ Cấu hình MySQL Docker")
    print("📝 Đừng quên chạy: docker-compose -f docker/docker-compose.yml up -d")

    # Set environment variable
    os.environ['DATABASE_URI'] = db_uri

    # Create .env file
    with open('.env', 'w') as f:
        f.write(f"DATABASE_URI={db_uri}\n")

    print("\n✅ Đã cấu hình database!")
    print(f"📄 Đã tạo file .env với DATABASE_URI")
    print(f"🔗 Database URI: {db_uri}")

    # Test connection
    print("\n🧪 Test kết nối database...")
    try:
        from backend.config import Config
        print("✅ Cấu hình database hợp lệ!")
    except ValueError as e:
        print(f"❌ Lỗi cấu hình: {e}")
        return

    print("\n🎉 Setup hoàn thành!")
    print("\n📋 Các bước tiếp theo:")
    print("1. Nếu dùng Docker: docker-compose -f docker/docker-compose.yml up -d")
    print("2. Chạy backend: cd backend && python app.py")
    print("3. Chạy frontend: cd frontend && npm run dev")
    print("4. Truy cập: http://localhost:3000")
    print("5. Login: admin / demo123")

if __name__ == '__main__':
    main()
