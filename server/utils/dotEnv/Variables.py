"""
- File: Variables.py
- Author: Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
- Description: Environment variable configuration and management
"""

from dataclasses import dataclass
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()


@dataclass
class EnvironmentVariables:
    """
    Environment variable configuration class

    Stores and provides access to all environment variables used in the application.
    Variables are loaded from .env file or system environment.

    Attributes:
        DATABASE_URL: Connection string for the database
        SECRET_KEY: Secret key for JWT access token signing
        REFRESH_SECRET_KEY: Secret key for JWT refresh token signing
        JWT_ALGORITHM: Algorithm used for JWT token signing
        TOKEN_WILL_EXPIRES_MIN: Access token expiration time in minutes
        REFRESH_TOKEN_WILL_EXPIRES_DAYS: Refresh token expiration time in days
        TEST_ENDPOINT: Endpoint URL for testing
        SERP_API_KEY: API key for SerpAPI service
    """
    DATABASE_URL: str = os.getenv("DATABASE_URL")
    SECRET_KEY: str = os.getenv("SECRET_KEY")
    REFRESH_SECRET_KEY: str = os.getenv("REFRESH_SECRET_KEY")
    JWT_ALGORITHM: str = os.getenv("JWT_ALGORITHM")
    TOKEN_WILL_EXPIRES_MIN: int = int(os.getenv("TOKEN_WILL_EXPIRES_MIN"))
    REFRESH_TOKEN_WILL_EXPIRES_DAYS: int = int(
        os.getenv("REFRESH_TOKEN_WILL_EXPIRES_DAYS")
    )
    TEST_ENDPOINT: str = os.getenv("TEST_ENDPOINT")
    SERP_API_KEY: str = os.getenv("SERP_API_KEY")


# Create singleton instance of environment variables
env = EnvironmentVariables()
