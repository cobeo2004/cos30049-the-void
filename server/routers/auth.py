from fastapi import Body, Depends
from fastapi.routing import APIRouter

from controller import AuthController
from context import PrismaSingleton
from prisma.partials import UserForSignUp, UserForAuth, UserAllFields
from models import AuthReturnModel, RefreshTokenModel
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
    return await controller.signIn(model)


@router.get("/me", response_model=UserAllFields)
async def me(
    user_id: str = Depends(get_current_user_id),
    controller: AuthController = Depends(AuthController),
):
    return await controller.getMe(user_id, PrismaSingleton)


@router.post("/refreshToken", response_model=RefreshTokenModel)
async def refresh_token(
    refresh_token: RefreshTokenModel,
    user_id: str = Depends(get_current_user_id),
    controller: AuthController = Depends(AuthController),
):
    return await controller.refreshToken(
        refresh_token.refresh_token, user_id, PrismaSingleton
    )
