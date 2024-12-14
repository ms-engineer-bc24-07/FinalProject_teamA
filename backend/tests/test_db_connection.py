import pymysql

try:
    connection = pymysql.connect(
        host='localhost',
        user='root',
        password='MysqL1515@',
        database='myclosetapp'
    )
    print("MySQL connection successful.")
    connection.close()
except Exception as e:
    print(f"MySQL connection failed: {e}")
