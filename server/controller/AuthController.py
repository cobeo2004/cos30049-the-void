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
from models import AuthReturnModel, RefreshTokenModel
from context import PrismaSingleton
import re


class Controller:

    def __init__(self):
        self.db = PrismaSingleton

    async def refreshToken(
        self,
        refresh_token: Annotated[str, Doc("The refresh token")],
        id: Annotated[str, Doc("The id of the user")],
    ) -> RefreshTokenModel:
        payload = verify_refresh_token(refresh_token)
        if not payload or payload["sub"] != id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token"
            )
        user = await self.db.user.find_unique(where={"id": id})
        if not user:
            logger.error(f"User not found: {id}")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
            )
        return RefreshTokenModel(refresh_token=create_access_token(user))

    async def getMe(
        self,
        id: Annotated[str, Doc("The user id")],
    ) -> UserAllFields | None:
        user = await self.db.user.find_unique(where={"id": id})
        if not user:
            logger.error(f"User not found: {id}")
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

        if not user.email or not user.username or not user.password:
            logger.error(f"Email, username and password are required: {user}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email, username and password are required",
            )

        if not user.firstName or not user.lastName:
            logger.error(f"First name and last name are required: {user}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="First name and last name are required",
            )

        if not re.match(
            r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", user.email
        ):
            logger.error(f"Invalid email: {user.email}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid email"
            )

        if len(user.password) < 8:
            logger.error(f"Password must be at least 8 characters: {user}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Password must be at least 8 characters",
            )

        user_exists = await self.db.user.find_first(
            where={"AND": [{"email": user.email}, {"username": user.username}]}
        )
        if user_exists:
            logger.error(f"User already exists: {user_exists}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists"
            )

        hashed_password = hash_password(user.password)
        user_created = await self.db.user.create(
            data={**user.model_dump(exclude={"password"}), "password": hashed_password}
        )
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
        if not user.username or not user.password:
            logger.error(f"Username and password are required: {user}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username and password are required",
            )

        if len(user.password) < 8:
            logger.error(f"Password must be at least 8 characters: {user}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Password must be at least 8 characters",
            )

        found_user = await self.db.user.find_first(where={"username": user.username})
        if not found_user:
            logger.error(f"User not found: {user}")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Can not found user"
            )
        if not verify_password(user.password, found_user.password):
            logger.error(f"Invalid password: {user}")
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT, detail="Invalid password"
            )

        return_value: AuthReturnModel = {
            "user": found_user.model_dump(),
            "access_token": create_access_token(found_user),
            "refresh_token": create_refresh_token(found_user),
        }
        return return_value
