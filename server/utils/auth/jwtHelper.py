"""
- File: jwtHelper.py
- Author: Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
- Description: Provides JWT token generation and verification functionality for authentication
"""

from fastapi import HTTPException
from jose import jwt, JWTError
from prisma.models import User
from utils.dotEnv import env
from utils import logger
from typing_extensions import Any
from datetime import datetime, timedelta


def create_access_token(data: User | Any) -> str:
    """
    Creates a new JWT access token for a user

    Args:
        data: User object or data to encode in token

    Returns:
        str: Encoded JWT access token
    """
    logger.info(f"Data: {data}")
    expires_delta = datetime.now() + timedelta(minutes=env.TOKEN_WILL_EXPIRES_MIN)
    encode_data = dict(exp=expires_delta, sub=data.id)
    encoded = jwt.encode(encode_data, env.SECRET_KEY, algorithm=env.JWT_ALGORITHM)
    return encoded


def create_refresh_token(data: User | Any) -> str:
    """
    Creates a new JWT refresh token for a user

    Args:
        data: User object or data to encode in token

    Returns:
        str: Encoded JWT refresh token
    """
    expires_delta = datetime.now() + timedelta(days=env.REFRESH_TOKEN_WILL_EXPIRES_DAYS)
    encode_data = dict(exp=expires_delta, sub=data.id)
    encoded = jwt.encode(
        encode_data, env.REFRESH_SECRET_KEY, algorithm=env.JWT_ALGORITHM
    )
    return encoded


def verify_access_token(token: str) -> dict[str, Any] | Any:
    """
    Verifies a JWT access token

    Args:
        token: JWT token to verify

    Returns:
        dict: Decoded token payload

    Raises:
        HTTPException: If token is invalid or expired
    """
    try:
        payload = jwt.decode(token, env.SECRET_KEY, algorithms=[env.JWT_ALGORITHM])
        if datetime.fromtimestamp(payload["exp"]) < datetime.now():
            logger.error("[verify_access_token] Access token expired")
            raise HTTPException(status_code=401, detail="Access token expired")
        return payload
    except JWTError:
        logger.error("[verify_access_token] Invalid access token")
        raise HTTPException(status_code=401, detail="Access token expired")


def verify_refresh_token(token: str) -> dict[str, Any] | Any:
    """
    Verifies a JWT refresh token

    Args:
        token: JWT token to verify

    Returns:
        dict: Decoded token payload

    Raises:
        HTTPException: If token is invalid or expired
    """
    try:
        payload = jwt.decode(token, env.REFRESH_SECRET_KEY, algorithms=[env.JWT_ALGORITHM])
        if datetime.fromtimestamp(payload["exp"]) < datetime.now():
            logger.error("[verify_refresh_token] Refresh token expired")
            raise HTTPException(status_code=401, detail="Refresh token expired")
        return payload
    except JWTError:
        logger.error("[verify_refresh_token] Invalid refresh token")
        raise HTTPException(status_code=401, detail="Invalid refresh token")
