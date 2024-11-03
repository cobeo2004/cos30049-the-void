"""
- File: user.py
- Author: Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
- Description: Router handling user management endpoints
"""

from typing import Optional
from fastapi import APIRouter, Depends, Request
from controller import UserController
from prisma.partials import UserForSignUp
from context.RateLimiterWrapper import RateLimiter
from utils.auth import get_current_user_id

# Initialize router with authentication requirement
router = APIRouter(
    prefix="/user",
    tags=["user"],
    dependencies=[Depends(get_current_user_id)]
)


@router.get("")
@RateLimiter(max_calls=10, cooldown_time=60)
async def get_all_users(
    req: Request,
    controller: UserController = Depends(UserController)
):
    """
    Get list of all users

    Args:
        req: FastAPI request object
        controller: User controller instance

    Returns:
        list: List of all user records
    """
    return await controller.get_users()


@router.get("/{item_id}")
@RateLimiter(max_calls=10, cooldown_time=60)
async def get_user_by_id(
    req: Request,
    item_id: str,
    controller: UserController = Depends(UserController)
):
    """
    Get user by ID

    Args:
        req: FastAPI request object
        item_id: User ID to retrieve
        controller: User controller instance

    Returns:
        dict: User record matching the ID
    """
    return await controller.get_user(item_id)


@router.post("")
@RateLimiter(max_calls=10, cooldown_time=60)
async def create_user(
    req: Request,
    model: UserForSignUp,
    controller: UserController = Depends(UserController),
):
    """
    Create new user

    Args:
        req: FastAPI request object
        model: User data for creation
        controller: User controller instance

    Returns:
        dict: Created user record
    """
    return await controller.create_user(model)


@router.put("/{item_id}")
@RateLimiter(max_calls=10, cooldown_time=60)
async def update_user(
    req: Request,
    item_id: str,
    model: Optional[UserForSignUp],
    controller: UserController = Depends(UserController),
):
    """
    Update existing user

    Args:
        req: FastAPI request object
        item_id: ID of user to update
        model: Updated user data
        controller: User controller instance

    Returns:
        dict: Updated user record
    """
    return await controller.update_user(item_id, model)


@router.delete("/{item_id}")
@RateLimiter(max_calls=10, cooldown_time=60)
async def delete_user(
    req: Request,
    item_id: str,
    controller: UserController = Depends(UserController)
):
    """
    Delete user

    Args:
        req: FastAPI request object
        item_id: ID of user to delete
        controller: User controller instance

    Returns:
        dict: Deleted user record
    """
    return await controller.delete_user(item_id)
