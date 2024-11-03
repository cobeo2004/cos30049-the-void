"""
- File: passwordHelper.py
- Author: Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
- Description: Password hashing and verification utilities using bcrypt
"""

from passlib.context import CryptContext

# Initialize password context with bcrypt scheme
password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(curr_password: str, hashed_password: str) -> bool:
    """
    Verify a password against its hash

    Args:
        curr_password: Plain text password to verify
        hashed_password: Hashed password to compare against

    Returns:
        bool: True if password matches hash
    """
    return password_context.verify(curr_password, hashed_password)


def hash_password(password: str) -> str:
    """
    Hash a password using bcrypt

    Args:
        password: Plain text password to hash

    Returns:
        str: Hashed password
    """
    return password_context.hash(password)
