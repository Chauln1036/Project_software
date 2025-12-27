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

    print("\n📊 Chọn loại database:")
    print("1. SQLite (File-based, đơn giản nhất)")
    print("2. MySQL với Docker")
    print("3. PostgreSQL với Docker")
    print("4. MySQL local (đã cài đặt sẵn)")
    print("5. PostgreSQL local (đã cài đặt sẵn)")

    while True:
        try:
            choice = input("\nNhập lựa chọn (1-5): ").strip()

            if choice == "1":
                # SQLite
                db_uri = "sqlite:///bizflow.db"
                print("✅ Chọn SQLite - database sẽ tự động tạo file bizflow.db")

            elif choice == "2":
                # MySQL Docker
                db_uri = "mysql+pymysql://bizflow_user:bizflow_pass@127.0.0.1:3306/bizflow_db"
                print("✅ Chọn MySQL Docker")
                print("📝 Đừng quên chạy: docker-compose -f docker/docker-compose.yml up -d mysql")

            elif choice == "3":
                # PostgreSQL Docker
                db_uri = "postgresql://bizflow_user:bizflow_pass@127.0.0.1:5432/bizflow_db"
                print("✅ Chọn PostgreSQL Docker")
                print("📝 Đừng quên chạy: docker-compose -f docker/docker-compose.yml up -d postgres")

            elif choice == "4":
                # MySQL Local
                host = input("MySQL host (default: localhost): ").strip() or "localhost"
                port = input("MySQL port (default: 3306): ").strip() or "3306"
                user = input("MySQL username: ").strip()
                password = input("MySQL password: ").strip()
                database = input("Database name: ").strip()

                if not all([user, password, database]):
                    print("❌ Cần nhập đầy đủ thông tin MySQL")
                    continue

                db_uri = f"mysql+pymysql://{user}:{password}@{host}:{port}/{database}"
                print("✅ Cấu hình MySQL local")

            elif choice == "5":
                # PostgreSQL Local
                host = input("PostgreSQL host (default: localhost): ").strip() or "localhost"
                port = input("PostgreSQL port (default: 5432): ").strip() or "5432"
                user = input("PostgreSQL username: ").strip()
                password = input("PostgreSQL password: ").strip()
                database = input("Database name: ").strip()

                if not all([user, password, database]):
                    print("❌ Cần nhập đầy đủ thông tin PostgreSQL")
                    continue

                db_uri = f"postgresql://{user}:{password}@{host}:{port}/{database}"
                print("✅ Cấu hình PostgreSQL local")

            else:
                print("❌ Lựa chọn không hợp lệ")
                continue

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

            break

        except KeyboardInterrupt:
            print("\n\n👋 Đã hủy setup")
            return
        except Exception as e:
            print(f"\n❌ Lỗi: {e}")
            return

if __name__ == '__main__':
    main()
