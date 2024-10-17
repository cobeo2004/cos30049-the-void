
# import requests
# def test_if_rate_limter_works():
#     for i in range(6):
#         print(f"Request {i+1}")
#         req = requests.get("http://localhost:8000/ping")
#         assert req.status_code == 200
#     req = requests.get("http://localhost:8000/ping")
#     assert req.status_code == 429
