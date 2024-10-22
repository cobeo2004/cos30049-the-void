from typing import Optional
from fastapi import APIRouter, Depends, Request
from controller import UserController
from prisma.partials import UserForSignUp
from context.RateLimiterWrapper import RateLimiter
from utils.auth import get_current_user_id

router = APIRouter(
    prefix="/user", tags=["user"], dependencies=[Depends(get_current_user_id)]
)


@router.get("")
@RateLimiter(max_calls=10, cooldown_time=60)
async def get_all_users(
    req: Request, controller: UserController = Depends(UserController)
):
    return await controller.get_users()


@router.get("/{item_id}")
@RateLimiter(max_calls=10, cooldown_time=60)
async def get_user_by_id(
    req: Request, item_id: str, controller: UserController = Depends(UserController)
):
    return await controller.get_user(item_id)


@router.post("")
@RateLimiter(max_calls=10, cooldown_time=60)
async def create_user(
    req: Request,
    model: UserForSignUp,
    controller: UserController = Depends(UserController),
):
    return await controller.create_user(model)


@router.put("/{item_id}")
@RateLimiter(max_calls=10, cooldown_time=60)
async def update_user(
    req: Request,
    item_id: str,
    model: Optional[UserForSignUp],
    controller: UserController = Depends(UserController),
):
    print("Body requested: ", model)
    return await controller.update_user(item_id, model)


@router.delete("/{item_id}")
@RateLimiter(max_calls=10, cooldown_time=60)
async def delete_user(
    req: Request, item_id: str, controller: UserController = Depends(UserController)
):
    return await controller.delete_user(item_id)
