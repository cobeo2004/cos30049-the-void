"""
- File: JWTBearer.py
- Author: Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
- Description: JWT Bearer token authentication implementation for FastAPI
"""

from typing import Optional
from fastapi import Depends, HTTPException, Request
from fastapi.security import HTTPBearer
from fastapi.security.http import HTTPAuthorizationCredentials
from .jwtHelper import verify_access_token
from utils import logger
from jose import JWTError
from fastapi import status


class JWTBearer(HTTPBearer):
    """
    Custom JWT Bearer token authentication class

    Extends FastAPI's HTTPBearer to implement JWT token verification
    """

    def __init__(self, auto_error: bool = True):
        """Initialize with auto error handling option"""
        super(JWTBearer, self).__init__(auto_error=auto_error)

    async def __call__(
        self, request: Request
    ) -> HTTPAuthorizationCredentials | Optional[HTTPException]:
        """
        Process and verify JWT token from request

        Args:
            request: FastAPI request object

        Returns:
            HTTPAuthorizationCredentials: Valid credentials

        Raises:
            HTTPException: If token is invalid or missing
        """
        cred: HTTPAuthorizationCredentials = await super(JWTBearer, self).__call__(
            request
        )
        if cred:
            if not cred.scheme == "Bearer":
                raise HTTPException(
                    status_code=403, detail="Invalid authentication scheme."
                )
            token = cred.credentials
            if not self.verify_jwt(token):
                raise HTTPException(
                    status_code=403, detail="Invalid token or expired token."
                )
            return token

    def verify_jwt(self, jwt_token: str) -> bool:
        """
        Verify JWT token validity

        Args:
            jwt_token: JWT token string

        Returns:
            bool: True if token is valid
        """
        try:
            return verify_access_token(jwt_token)
        except JWTError:
            logger.error("[verify_jwt] Invalid token or expired token.")
            return False


async def get_current_user_id(token: str = Depends(JWTBearer())) -> str | None:
    """
    Get current user ID from JWT token

    Args:
        token: JWT token from authorization header

    Returns:
        str: User ID from token

    Raises:
        HTTPException: If token is invalid
    """
    payload = verify_access_token(token)
    if not payload:
        logger.error("[get_current_user_id] Could not validate credentials")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
        )
    return payload
