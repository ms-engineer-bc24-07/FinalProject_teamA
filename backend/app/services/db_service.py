#このコードは、データベースやAWS S3とやり取りし、コーディネート提案を生成するためのサービスを実装
import boto3
import base64
from flask import current_app
from app.models.clothes import Item
from app.services.openai_service import generate_outfit, parse_outfit_response
import mysql.connector
from mysql.connector import Error

s3_client = boto3.client('s3')

#みなさん、直接アクセス情報入力しているので、気を付けてください
class Database:
    def __init__(self):
        self.host = "localhost"
        self.user = "root"
        self.password = "MysqL1515@"
        self.database = "myclosetapp"

    def create_connection(self):
        try:
            connection = mysql.connector.connect(
                host=self.host,
                user=self.user,
                password=self.password,
                database=self.database
            )
            if connection.is_connected():
                print("Database connection successfully established.")
                return connection
        except Error as e:
            print(f"Error while connecting to MySQL: {e}")
            return None

    def close_connection(self, connection):
        if connection.is_connected():
            connection.close()
            print("Database connection closed.")

#特定のカテゴリーのアイテムをデータベースから取得
    def fetch_items(self, category):
        connection = self.create_connection()
        if not connection:
            return None

        try:
            cursor = connection.cursor(dictionary=True)
            cursor.execute(f"SELECT * FROM items WHERE category = '{category}'")
            result = cursor.fetchall()
            return result
        except Error as e:
            print(f"Error while fetching data: {e}")
            return None
        finally:
            cursor.close()
            self.close_connection(connection)

#トップスとボトムスの画像取得
db = Database()

def get_tops_and_bottoms():
    tops = db.fetch_items('tops')
    bottoms = db.fetch_items('bottoms')
    
    if tops is None or bottoms is None:
        return None
    
    top_images = [fetch_image_from_s3(top['url']) for top in tops]
    bottom_images = [fetch_image_from_s3(bottom['url']) for bottom in bottoms]
    
    return {
        'tops': top_images,
        'bottoms': bottom_images
    }

# fetch_image_from_s3 と parse_s3_url 関数は変更なし

#コーディネート提案の生成
def get_outfit_recommendation():
    tops = db.fetch_items('tops')
    bottoms = db.fetch_items('bottoms')
    
    if tops is None or bottoms is None:
        return None
    
    outfit_response = generate_outfit(tops, bottoms)
    top_color, bottom_color = parse_outfit_response(outfit_response)
    
    recommended_top = next((top for top in tops if top['color'] == top_color), None)
    recommended_bottom = next((bottom for bottom in bottoms if bottom['color'] == bottom_color), None)
    
    if recommended_top and recommended_bottom:
        return {
            'top': fetch_image_from_s3(recommended_top['url']),
            'bottom': fetch_image_from_s3(recommended_bottom['url']),
            'recommendation': outfit_response
        }
    else:
        return None

