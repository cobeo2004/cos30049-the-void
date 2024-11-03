"""
- File: test_auth.py
- Author: Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
- Description: Test suite for authentication endpoints including registration, login, and token refresh
"""

import requests


def test_if_route_is_protected():
    """Tests if protected routes require authentication"""
    req = requests.get("http://localhost:8000/user")
    assert req.status_code == 403
    assert req.json() == {"detail": "Not authenticated"}


def test_if_register_is_ok():
    """Tests user registration functionality

    Verifies:
    - Successful registration with valid data
    - Proper handling of duplicate user registration
    """
    req = requests.post(
        "http://localhost:8000/auth/signUp",
        json={
            "username": "test",
            "password": "test1234",
            "firstName": "test",
            "lastName": "test",
            "email": "test@test.com",
        },
    )
    assert req.status_code == 200 or req.status_code == 400
    if req.status_code == 200:
        # Verify response data structure
        assert req.json()["user"]["username"] == "test"
        assert req.json()["user"]["firstName"] == "test"
        assert req.json()["user"]["lastName"] == "test"
        assert req.json()["user"]["email"] == "test@test.com"
        assert req.json()["access_token"] is not None
        assert req.json()["refresh_token"] is not None
    else:
        assert req.json()["detail"] == "User already exists"


def test_if_login_is_ok():
    """Tests successful login with valid credentials"""
    req = requests.post(
        "http://localhost:8000/auth/signIn",
        json={"username": "test", "password": "test1234"},
    )
    assert req.status_code == 200
    assert req.json()["user"]["username"] == "test"
    assert req.json()["user"]["firstName"] == "test"
    assert req.json()["user"]["lastName"] == "test"
    assert req.json()["user"]["email"] == "test@test.com"
    assert req.json()["access_token"] is not None
    assert req.json()["refresh_token"] is not None


def test_if_login_is_not_ok():
    """Tests login failure with invalid credentials"""
    req = requests.post(
        "http://localhost:8000/auth/signIn",
        json={"username": "test", "password": "test12345"},
    )
    assert req.status_code == 409
    assert req.json() == {"detail": "Invalid password"}


def test_if_refresh_token_is_ok():
    """Tests token refresh functionality

    Verifies:
    - Successful token refresh with valid refresh token
    - New tokens are generated correctly
    """
    # First, get initial tokens through login
    req = requests.post(
        "http://localhost:8000/auth/signIn",
        json={"username": "test", "password": "test1234"},
    )
    refresh_token = req.json()["refresh_token"]
    access_token = req.json()["access_token"]

    # Test token refresh
    req_after_refresh = requests.post(
        "http://localhost:8000/auth/refreshToken",
        json={"refresh_token": refresh_token},
        headers={"Authorization": f"Bearer {access_token}"},
    )
    assert req_after_refresh.status_code == 200
    assert req_after_refresh.json()["access_token"] is not None
    assert req_after_refresh.json()["refresh_token"] is not None

def test_if_route_is_accessible_with_access_token():
    """Tests if protected routes are accessible with valid access token"""
    # Get access token through login
    req = requests.post(
        "http://localhost:8000/auth/signIn",
        json={"username": "test", "password": "test1234"},
    )
    access_token = req.json()["access_token"]

    # Test protected route access
    req2 = requests.get(
        "http://localhost:8000/user",
        headers={"Authorization": f"Bearer {access_token}"}
    )
    assert req2.status_code == 200
    assert req2.json() == []

