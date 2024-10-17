import requests


def test_if_route_is_protected():
    req = requests.get("http://localhost:8000/user")
    assert req.status_code == 403
    assert req.json() == {"detail": "Not authenticated"}


def test_if_register_is_ok():
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
        assert req.json()["user"]["username"] == "test"
        assert req.json()["user"]["firstName"] == "test"
        assert req.json()["user"]["lastName"] == "test"
        assert req.json()["user"]["email"] == "test@test.com"
        assert req.json()["access_token"] is not None
        assert req.json()["refresh_token"] is not None
    else:
        assert req.json()["detail"] == "User already exists"


def test_if_login_is_ok():
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
    req = requests.post(
        "http://localhost:8000/auth/signIn",
        json={"username": "test", "password": "test12345"},
    )
    assert req.status_code == 409
    assert req.json() == {"detail": "Invalid password"}


def test_if_refresh_token_is_ok():
    req = requests.post(
        "http://localhost:8000/auth/signIn",
        json={"username": "test", "password": "test1234"},
    )
    refresh_token = req.json()["refresh_token"]
    access_token = req.json()["access_token"]
    print(f"Access token: {access_token}")
    print(f"Refresh token: {refresh_token}")
    req_after_refresh = requests.post(
        "http://localhost:8000/auth/refreshToken",
        json={"refresh_token": refresh_token},
        headers={"Authorization": f"Bearer {access_token}"},
    )
    print(f"After refresh: {req_after_refresh.json()}")
    print(f"Access token after refresh: {req_after_refresh.json()['access_token']}")
    print(f"Refresh token after refresh: {req_after_refresh.json()['refresh_token']}")
    assert req_after_refresh.status_code == 200
    assert req_after_refresh.json()["access_token"] is not None
    assert req_after_refresh.json()["refresh_token"] is not None
    # assert req_after_refresh.json()["access_token"] != access_token
    # assert req_after_refresh.json()["refresh_token"] != refresh_token

def test_if_route_is_accessible_with_access_token():
    req = requests.post(
        "http://localhost:8000/auth/signIn",
        json={"username": "test", "password": "test1234"},
    )
    access_token = req.json()["access_token"]
    req2 = requests.get("http://localhost:8000/user", headers={"Authorization": f"Bearer {access_token}"})
    assert req2.status_code == 200
    assert req2.json() == []

