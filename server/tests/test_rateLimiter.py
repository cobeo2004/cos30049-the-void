"""
- File: test_rateLimiter.py
- Author: Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
- Description: Test suite for rate limiting functionality
"""

import requests

def test_if_rate_limter_works():
    """
    Tests if the rate limiter correctly blocks requests after exceeding the limit

    The test:
    1. Makes 6 requests which should succeed
    2. Makes a 7th request which should be blocked
    3. Verifies the rate limit response
    """
    # Make requests up to the limit
    for i in range(6):
        print(f"Request {i+1}")
        req = requests.get("http://localhost:8000/ping")
        assert req.status_code == 200

    # This request should be rate limited
    req = requests.get("http://localhost:8000/ping")
    assert req.status_code == 429
