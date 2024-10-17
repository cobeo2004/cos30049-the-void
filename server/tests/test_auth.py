import requests

# TODO: Write tests for register and login

def test_if_route_is_protected():
    req = requests.get("http://localhost:8000/user")
    assert req.status_code == 403
    assert req.json() == {"detail": "Not authenticated"}

def test_if_register_is_ok():
    req = requests.post("http://localhost:8000/auth/signUp", json={"username": "test", "password": "test"})
