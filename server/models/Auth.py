"""
- File: Auth.py
- Author: Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
- Description: Defines data models for authentication-related operations
"""

from pydantic import BaseModel
from prisma.partials import UserAllFields


class AuthReturnModel(BaseModel):
    """
    Response model for authentication operations

    Attributes:
        user: Complete user profile data
        access_token: JWT access token for API authorization
        refresh_token: JWT refresh token for obtaining new access tokens
    """
    user: UserAllFields
    access_token: str
    refresh_token: str


class RefreshTokenInputModel(BaseModel):
    """
    Input model for token refresh requests

    Attributes:
        refresh_token: Current refresh token to be used for generating new tokens
    """
    refresh_token: str


class RefreshTokenOutputModel(BaseModel):
    """
    Response model for token refresh operations

    Attributes:
        access_token: New JWT access token
        refresh_token: New JWT refresh token
    """
    access_token: str
    refresh_token: str
