import requests
import pytest


def test_if_server_is_alive():
    req = requests.get("http://localhost:8000/ping")
    assert req.status_code == 200
    assert req.json() == {"message": "pong"}


def test_server_response_time():
    req = requests.get("http://localhost:8000/ping")
    assert req.elapsed.total_seconds() < 1  # Assuming response should be under 1 second


@pytest.mark.parametrize("endpoint", ["/", "/nonexistent"])
def test_not_found_endpoints(endpoint):
    req = requests.get(f"http://localhost:8000{endpoint}")
    assert req.status_code == 404


def test_server_headers():
    req = requests.get("http://localhost:8000/ping")
    assert "Content-Type" in req.headers
    assert req.headers["Content-Type"] == "application/json"


def test_server_method_not_allowed():
    req = requests.post("http://localhost:8000/ping")
    assert req.status_code == 405  # Method Not Allowed
