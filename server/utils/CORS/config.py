"""
- File: config.py
- Author: Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
- Description: Configuration for Cross-Origin Resource Sharing (CORS) settings
"""

from dataclasses import dataclass, field


@dataclass
class CORSConfig:
    """
    CORS configuration settings for the API

    Attributes:
        ORIGINS: List of allowed origins (domains) that can access the API
        ALLOW_CREDENTIALS: Whether to allow credentials (cookies, authorization headers)
        ALLOW_METHODS: HTTP methods that are allowed for CORS requests
        ALLOW_HEADERS: HTTP headers that are allowed in CORS requests
    """
    ORIGINS: list[str] = field(default_factory=lambda: ["http://localhost:3000"])
    ALLOW_CREDENTIALS: bool = True
    ALLOW_METHODS: list[str] = field(
        default_factory=lambda: ["GET", "POST", "PUT", "DELETE"]
    )
    ALLOW_HEADERS: list[str] = field(default_factory=lambda: ["*"])


# Create a singleton instance of the CORS configuration
cors_config = CORSConfig()
