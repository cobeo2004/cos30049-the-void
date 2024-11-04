"""
- File: AuthController.py
- Author: Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
- Description: Controller handling authentication-related business logic
"""

from datetime import datetime
from typing_extensions import Annotated, Doc
from fastapi import HTTPException, status
from prisma.partials import UserForSignUp, UserForAuth, UserAllFields
from utils.auth import (
    hash_password,
    create_access_token,
    create_refresh_token,
    verify_password,
    verify_refresh_token,
)
from utils import logger
from models import AuthReturnModel, RefreshTokenInputModel, RefreshTokenOutputModel
from context import PrismaSingleton
import re


class Controller:
    """
    Controller class handling user authentication operations

    Handles:
    - User registration
    - User login
    - Token refresh
    - User profile retrieval
    """

    def __init__(self):
        """Initialize with database connection"""
        self.db = PrismaSingleton

    async def refreshToken(
        self,
        refresh_token: Annotated[str, Doc("The refresh token")],
        access_token_exp: Annotated[str, Doc("The time of the access token")],
    ) -> RefreshTokenOutputModel:
        """
        Refresh access token using refresh token

        Args:
            refresh_token: Current refresh token
            access_token_exp: Expiration time of current access token

        Returns:
            RefreshTokenOutputModel: New access and refresh tokens

        Raises:
            HTTPException: If tokens are invalid or expired
        """
        payload = verify_refresh_token(refresh_token)
        if not payload:
            logger.error("[Controller.refreshToken] Invalid refresh token")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token"
            )
        if datetime.fromtimestamp(payload["exp"]) < datetime.now():
            logger.error("[Controller.refreshToken] Refresh token expired")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Refresh token expired"
            )

        if datetime.fromtimestamp(access_token_exp) > datetime.now():
            logger.error("[Controller.refreshToken] Token is not expired")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Token is not expired"
            )

        user = await self.db.user.find_unique(where={"id": payload["sub"]})
        if not user:
            logger.error(f"[Controller.refreshToken] User not found: {payload['sub']}")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
            )
        return RefreshTokenOutputModel(
            refresh_token=create_refresh_token(user),
            access_token=create_access_token(user)
        )

    async def getMe(
        self,
        id: Annotated[str, Doc("The user id")],
    ) -> UserAllFields | None:
        """
        Get current user profile

        Args:
            id: User ID to retrieve

        Returns:
            UserAllFields: User profile data

        Raises:
            HTTPException: If user not found
        """
        user = await self.db.user.find_unique(where={"id": id})
        if not user:
            logger.error(f"[Controller.getMe] User not found: {id}")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
            )
        return user.model_dump()

    async def signUp(
        self,
        user: Annotated[
            UserForSignUp,
            Doc("The auto-generated schema for signing up user by Prisma"),
        ],
    ) -> AuthReturnModel:
        """
        Handle user registration

        Args:
            user: User registration data

        Returns:
            AuthReturnModel: New user data with tokens

        Raises:
            HTTPException: For validation errors or existing user
        """
        # Validate required fields
        if not user.email or not user.username or not user.password:
            logger.error(f"[Controller.signUp] Email, username and password are required: {user}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email, username and password are required",
            )

        if not user.firstName or not user.lastName:
            logger.error(f"[Controller.signUp] First name and last name are required: {user}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="First name and last name are required",
            )

        # Validate email format
        if not re.match(
            r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", user.email
        ):
            logger.error(f"[Controller.signUp] Invalid email: {user.email}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid email"
            )

        # Validate password length
        if len(user.password) < 8:
            logger.error(f"[Controller.signUp] Password must be at least 8 characters: {user}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Password must be at least 8 characters",
            )

        # Check for existing user
        user_exists = await self.db.user.find_first(
            where={"AND": [{"email": user.email}, {"username": user.username}]}
        )
        if user_exists:
            logger.error(f"[Controller.signUp] User already exists: {user_exists}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists"
            )

        # Create new user
        hashed_password = hash_password(user.password)
        user_created = await self.db.user.create(
            data={**user.model_dump(exclude={"password"}), "password": hashed_password}
        )

        # Generate tokens
        access_token = create_access_token(user_created)
        refresh_token = create_refresh_token(user_created)
        return_value: AuthReturnModel = AuthReturnModel(
            user=user_created.model_dump(),
            access_token=access_token,
            refresh_token=refresh_token,
        )
        return return_value

    async def signIn(
        self,
        user: Annotated[
            UserForAuth, Doc("The auto-generated schema for signing in user by Prisma")
        ],
    ) -> AuthReturnModel:
        """
        Handle user login

        Args:
            user: User login credentials

        Returns:
            AuthReturnModel: User data with new tokens

        Raises:
            HTTPException: For invalid credentials
        """
        # Validate required fields
        if not user.username or not user.password:
            logger.error(f"[Controller.signIn] Username and password are required: {user}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username and password are required",
            )

        # Validate password length
        if len(user.password) < 8:
            logger.error(f"[Controller.signIn] Password must be at least 8 characters: {user}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Password must be at least 8 characters",
            )

        # Find and verify user
        found_user = await self.db.user.find_first(where={"username": user.username})
        if not found_user:
            logger.error(f"[Controller.signIn] User not found: {user}")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Can not found user"
            )
        if not verify_password(user.password, found_user.password):
            logger.error(f"[Controller.signIn] Invalid password: {user}")
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT, detail="Invalid password"
            )

        # Generate tokens
        return_value: AuthReturnModel = {
            "user": found_user.model_dump(),
            "access_token": create_access_token(found_user),
            "refresh_token": create_refresh_token(found_user),
        }
        return return_value
