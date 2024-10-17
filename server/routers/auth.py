from typing import Any
from fastapi import Body, Depends
from fastapi.routing import APIRouter

from controller import AuthController
from context import PrismaSingleton
from prisma.partials import UserForSignUp, UserForAuth, UserAllFields
from models import AuthReturnModel, RefreshTokenInputModel, RefreshTokenOutputModel
from utils.auth import get_current_user_id
from utils import logger

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/signUp", response_model=AuthReturnModel)
async def sign_up(
    model: UserForSignUp, controller: AuthController = Depends(AuthController)
):
    return await controller.signUp(model)


@router.post("/signIn", response_model=AuthReturnModel)
async def sign_in(
    model: UserForAuth, controller: AuthController = Depends(AuthController)
):
    logger.info(f"Signing in user: {model}")
    return await controller.signIn(model)


@router.get("/me", response_model=UserAllFields)
async def me(
    token: Any = Depends(get_current_user_id),
    controller: AuthController = Depends(AuthController),
):
    return await controller.getMe(token["sub"])


@router.post("/refreshToken", response_model=RefreshTokenOutputModel)
async def refresh_token(
    refresh_token: RefreshTokenInputModel,
    token: Any = Depends(get_current_user_id),
    controller: AuthController = Depends(AuthController),
):
    return await controller.refreshToken(
        refresh_token.refresh_token, token["exp"]
    )
