import boto3
from botocore.exceptions import ClientError
import base64
from urllib.parse import quote, urlparse

s3_client = boto3.client('s3')

def parse_s3_url(url):
    parsed_url = urlparse(url)
    if parsed_url.scheme == 's3':
        bucket_name = parsed_url.netloc
        object_key = quote(parsed_url.path.lstrip('/'))
    elif parsed_url.scheme in ['http', 'https']:
        domain_parts = parsed_url.netloc.split('.s3')
        if len(domain_parts) > 1:
            bucket_name = domain_parts[0]
            object_key = quote(parsed_url.path.lstrip('/'))
        else:
            raise ValueError("Invalid S3 URL format")
    else:
        raise ValueError("Invalid URL scheme")
    print(f"Parsed bucket: {bucket_name}, key: {object_key}")  # 確認用のログ出力
    return bucket_name, object_key

def fetch_image_from_s3(url):
    try:
        bucket_name, object_key = parse_s3_url(url)
        print(f"Fetching from bucket: {bucket_name}, key: {object_key}")
        if not check_s3_key_exists(bucket_name, object_key):
            raise ValueError(f"Key does not exist: {object_key}")
        response = s3_client.get_object(Bucket=bucket_name, Key=object_key)
        image_data = response['Body'].read()
        encoded_image = base64.b64encode(image_data).decode('utf-8')
        return f"data:image/png;base64,{encoded_image}"
    except ClientError as e:
        print(f"Error fetching image from S3: {e}")
        return url
    except Exception as e:
        print(f"Unexpected error: {e}")
        return url

def get_s3_image_url(bucket_name, object_key):
    try:
        url = s3_client.generate_presigned_url('get_object',
                                               Params={'Bucket': bucket_name,
                                                       'Key': object_key},
                                               ExpiresIn=3600)  # URL有効期限は1時間
    except ClientError as e:
        print(e)
        return None
    return url

def update_image_urls(clothes_list, bucket_name):
    for item in clothes_list:
        item['image_url'] = get_s3_image_url(bucket_name, item['image_url'])
    return clothes_list

def check_s3_key_exists(bucket_name, object_key):
    try:
        s3_client.head_object(Bucket=bucket_name, Key=object_key)
        print(f"Object {object_key} exists in bucket {bucket_name}.")  # 確認用のログ出力
        return True
    except ClientError as e:
        if e.response['Error']['Code'] == "404":
            print(f"Key does not exist: {object_key}")
            return False
        else:
            print(f"Error checking key: {e}")
            raise


















# import boto3
# from botocore.exceptions import ClientError
# import base64
# from urllib.parse import urlparse

# def get_s3_image_url(bucket_name, object_key):
#     s3_client = boto3.client('s3')
#     try:
#         url = s3_client.generate_presigned_url('get_object',
#                                                Params={'Bucket': bucket_name,
#                                                        'Key': object_key},
#                                                ExpiresIn=3600)  # URL有効期限は1時間
#     except ClientError as e:
#         print(e)
#         return None
#     return url

# def update_image_urls(clothes_list, bucket_name):
#     for item in clothes_list:
#         item['image_url'] = get_s3_image_url(bucket_name, item['image_url'])
#     return clothes_list

# def fetch_image_from_s3(url):
#     try:
#         parsed_url = urlparse(url)
#         bucket_name = parsed_url.netloc.split('.')[0]
#         object_key = parsed_url.path.lstrip('/')
        
#         s3_client = boto3.client('s3')
#         response = s3_client.get_object(Bucket=bucket_name, Key=object_key)
#         image_data = response['Body'].read()
#         encoded_image = base64.b64encode(image_data).decode('utf-8')
#         return f"data:image/png;base64,{encoded_image}"
#     except ClientError as e:
#         print(f"Error fetching image from S3: {e}")
#         return url
    
#     def parse_s3_url(url):
#      parsed_url = urlparse(url)
#     if parsed_url.scheme == 's3':
#         bucket_name = parsed_url.netloc
#         object_key = parsed_url.path.lstrip('/')
#     elif parsed_url.scheme in ['http', 'https']:
#         domain_parts = parsed_url.netloc.split('.s3')
#         if len(domain_parts) > 1:
#             bucket_name = domain_parts[0]
#             object_key = parsed_url.path.lstrip('/')
#         else:
#             raise ValueError("Invalid S3 URL format")
#     else:
#         raise ValueError("Invalid URL scheme")
#     return bucket_name, object_key


