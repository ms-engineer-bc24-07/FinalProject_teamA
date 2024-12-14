import boto3
from botocore.exceptions import ClientError

def test_s3_connection():
    bucket_name = 'myclosetphoto'
    
    try:
        # S3クライアントを作成
        s3 = boto3.client('s3')
        
        # 指定したバケットの存在を確認
        s3.head_bucket(Bucket=bucket_name)
        print(f"S3 connection successful. Bucket '{bucket_name}' exists.")
        
        # バケット内のオブジェクトを一覧表示（最大10個）
        response = s3.list_objects_v2(Bucket=bucket_name, MaxKeys=10)
        if 'Contents' in response:
            print("Objects in the bucket:")
            for obj in response['Contents']:
                print(f"  - {obj['Key']}")
        else:
            print("The bucket is empty.")
    
    except ClientError as e:
        if e.response['Error']['Code'] == '404':
            print(f"S3 connection failed: Bucket '{bucket_name}' does not exist.")
        else:
            print(f"S3 connection failed: {e}")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    test_s3_connection()
