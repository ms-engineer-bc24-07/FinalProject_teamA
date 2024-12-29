import requests
import json

# Base URL
BASE_URL = 'http://localhost:5000/api'

# Test data for user creation
user_data = {
    "email": "testuser@example.com",
    "birthday": "1990-01-01"
}

# Test data for coordinate recommendation
coordinate_data = {
    "tops-image": "https://myclosetphoto.s3.amazonaws.com/tops.png",
    "bottoms-image": "https://myclosetphoto.s3.amazonaws.com/bottoms.png",
    "date": "2024-01-01"
}

# Test functions
def test_create_user():
    url = f"{BASE_URL}/users"
    headers = {'Content-Type': 'application/json'}
    response = requests.post(url, headers=headers, data=json.dumps(user_data))
    print("User Creation Test")
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")

def test_recommend_coordinate():
    url = f"{BASE_URL}/coordinate/recommend"
    headers = {'Content-Type': 'application/json'}
    response = requests.post(url, headers=headers, data=json.dumps(coordinate_data))
    print("Coordinate Recommendation Test")
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")

def test_get_item():
    item_id = 1  # 必要に応じてアイテムIDを変更
    url = f"{BASE_URL}/items/{item_id}"
    response = requests.get(url)
    print("Get Item Test")
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")

if __name__ == "__main__":
    test_create_user()
    test_recommend_coordinate()
    test_get_item()
