"""
- File: auth.py
- Author: Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
- Description: Authentication router handling user registration, login, and token management
"""

from typing import Any
from fastapi import Depends, Request
from fastapi.routing import APIRouter

from controller import AuthController
from prisma.partials import UserForSignUp, UserForAuth, UserAllFields
from models import AuthReturnModel, RefreshTokenInputModel, RefreshTokenOutputModel
from context.RateLimiterWrapper import RateLimiter
from utils.auth import get_current_user_id
from utils import logger

# Initialize router with auth prefix and tags
router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/signUp", response_model=AuthReturnModel)
@RateLimiter(max_calls=10, cooldown_time=60)
async def sign_up(
    req: Request,
    model: UserForSignUp,
    controller: AuthController = Depends(AuthController),
):
    """
    Handle user registration

    Args:
        req: FastAPI request object
        model: User registration data
        controller: Auth controller instance

    Returns:
        AuthReturnModel: New user data with access and refresh tokens
    """
    return await controller.signUp(model)


@router.post("/signIn", response_model=AuthReturnModel)
@RateLimiter(max_calls=10, cooldown_time=60)
async def sign_in(
    req: Request,
    model: UserForAuth,
    controller: AuthController = Depends(AuthController),
):
    """
    Handle user login

    Args:
        req: FastAPI request object
        model: User login credentials
        controller: Auth controller instance

    Returns:
        AuthReturnModel: User data with new access and refresh tokens
    """
    logger.info(f"Signing in user: {model}")
    return await controller.signIn(model)


@router.get("/me", response_model=UserAllFields)
async def me(
    req: Request,
    token: Any = Depends(get_current_user_id),
    controller: AuthController = Depends(AuthController),
):
    """
    Get current user profile

    Args:
        req: FastAPI request object
        token: JWT token payload from authorization header
        controller: Auth controller instance

    Returns:
        UserAllFields: Current user profile data
    """
    return await controller.getMe(token["sub"])


@router.post("/refreshToken", response_model=RefreshTokenOutputModel)
@RateLimiter(max_calls=10, cooldown_time=60)
async def refresh_token(
    req: Request,
    refresh_token: RefreshTokenInputModel,
    token: Any = Depends(get_current_user_id),
    controller: AuthController = Depends(AuthController),
):
    """
    Refresh access token using refresh token

    Args:
        req: FastAPI request object
        refresh_token: Current refresh token
        token: Current access token payload
        controller: Auth controller instance

    Returns:
        RefreshTokenOutputModel: New access and refresh tokens
    """
    return await controller.refreshToken(refresh_token.refresh_token, token["exp"])
