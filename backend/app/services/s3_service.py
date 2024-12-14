import boto3
from botocore.exceptions import ClientError

def get_s3_image_url(bucket_name, object_key):
    s3_client = boto3.client('s3')
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
