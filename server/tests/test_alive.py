"""
- File: test_alive.py
- Author: Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
- Description: Test suite for server health check and basic functionality
"""

import requests
import pytest


def test_if_server_is_alive():
    """Tests if the server responds to basic health check"""
    req = requests.get("http://localhost:8000/ping")
    assert req.status_code == 200
    assert req.json() == {"message": "pong"}


def test_server_response_time():
    """Tests if server response time is within acceptable limits"""
    req = requests.get("http://localhost:8000/ping")
    assert req.elapsed.total_seconds() < 1  # Assuming response should be under 1 second


@pytest.mark.parametrize("endpoint", ["/", "/nonexistent"])
def test_not_found_endpoints(endpoint):
    """Tests if server properly handles non-existent endpoints"""
    req = requests.get(f"http://localhost:8000{endpoint}")
    assert req.status_code == 404


def test_server_headers():
    """Tests if server returns correct headers"""
    req = requests.get("http://localhost:8000/ping")
    assert "Content-Type" in req.headers
    assert req.headers["Content-Type"] == "application/json"


def test_server_method_not_allowed():
    """Tests if server properly handles incorrect HTTP methods"""
    req = requests.post("http://localhost:8000/ping")
    assert req.status_code == 405  # Method Not Allowed
