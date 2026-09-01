import requests

url = 'http://localhost:5173'
try:
    response = requests.get(url)
    print(f"Server is running on {url}")
except requests.exceptions.ConnectionError:
    print("Server is not running.")
