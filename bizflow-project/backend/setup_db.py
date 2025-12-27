import os
import pymssql
from dotenv import load_dotenv

# 1. Nạp thông tin từ file .env
load_dotenv()

server = os.getenv("DB_HOST")
user = os.getenv("DB_USER")
password = os.getenv("DB_PASSWORD")
db_name = os.getenv("DB_NAME")

print(f"Dang ket noi thu den {server}...")

try:
    # 2. Kết nối đến SQL Server (kết nối vào hệ thống chung trước)
    conn = pymssql.connect(server=server, user=user, password=password, port=1433)
    conn.autocommit(True) # Cho phép chạy lệnh tạo DB
    cursor = conn.cursor()

    # 3. Kiểm tra và tạo Database
    cursor.execute(f"SELECT name FROM master.dbo.sysdatabases WHERE name = N'{db_name}'")
    exists = cursor.fetchone()

    if not exists:
        print(f"-> Database '{db_name}' chua co. Dang tao moi...")
        cursor.execute(f"CREATE DATABASE {db_name}")
        print(f"-> THANH CONG! Da tao database: {db_name}")
    else:
        print(f"-> Database '{db_name}' da ton tai. Khong can tao lai.")

    conn.close()
    print("-> Ket noi OK. Moi thu da san sang!")

except Exception as e:
    print("\nLOI ROI BAN OI! Kiem tra lai cac buoc sau:")
    print("1. Ban da chay lenh 'pip install python-dotenv pymssql' chua?")
    print("2. File .env co nam cung thu muc voi file nay khong?")
    print("3. Noi dung loi chi tiet:", e)
