from fastapi import HTTPException, status
from prisma import Prisma
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


class Controller:

    async def refreshToken(self, refresh_token: str, id: str, db: Prisma) -> RefreshTokenModel:
        payload = verify_refresh_token(refresh_token)
        if not payload or payload["sub"] != id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token"
            )
        user = await db.user.find_unique(where={"id": id})
        if not user:
            logger.error(f"User not found: {id}")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
            )
        return RefreshTokenModel(refresh_token=create_access_token(user))

    async def getMe(self, id: str, db: Prisma) -> UserAllFields | None:
        user = await db.user.find_unique(where={"id": id})
        if not user:
            logger.error(f"User not found: {id}")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
            )
        return user.model_dump()

    async def signUp(self, user: UserForSignUp, db: Prisma) -> AuthReturnModel:
        if not user.email or not user.username or not user.password:
            logger.error(f"Email, username and password are required: {user}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email, username and password are required",
            )

        user_exists = await db.user.find_first(
            where={"OR": [{"email": user.email}, {"username": user.username}]}
        )
        if user_exists:
            logger.error(f"User already exists: {user_exists}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists"
            )

        hashed_password = hash_password(user.password)
        user_created = await db.user.create(
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

    async def signIn(self, user: UserForAuth, db: Prisma):
        if not user.username or not user.password:
            logger.error(f"Username and password are required: {user}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username and password are required",
            )
        found_user = await db.user.find_first(where={"username": user.username})
        if not found_user:
            logger.error(f"User not found: {user}")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Can not found user"
            )
        if not verify_password(user.password, found_user.password):
            logger.error(f"Invalid password: {user}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid password"
            )

        return_value: AuthReturnModel = {
            "user": found_user.model_dump(),
            "access_token": create_access_token(found_user),
            "refresh_token": create_refresh_token(found_user),
        }
        return return_value
