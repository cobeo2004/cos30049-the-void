from fastapi import APIRouter, Depends, Request
from controller import PostController
from prisma.partials import PostAllFields
from context.RateLimiterWrapper import RateLimiter
from utils.auth import get_current_user_id

router = APIRouter(
    prefix="/user", tags=["user"], dependencies=[Depends(get_current_user_id)]
)


@router.get("")
@RateLimiter(max_calls=10, cooldown_time=60)
async def read_posts(
    req: Request, controller: PostController = Depends(PostController)
):
    return await controller.get_posts()


@router.get("/{item_id}")
@RateLimiter(max_calls=10, cooldown_time=60)
async def read_post_by_id(
    req: Request, item_id: int, controller: PostController = Depends(PostController)
):
    return await controller.get_post(item_id)


@router.post("")
@RateLimiter(max_calls=10, cooldown_time=60)
async def append_post(
    req: Request,
    model: PostAllFields,
    controller: PostController = Depends(PostController),
):
    return await controller.add_post(model)


@router.put("/{item_id}")
@RateLimiter(max_calls=10, cooldown_time=60)
async def update_post(
    req: Request,
    item_id: int,
    model: PostAllFields,
    controller: PostController = Depends(PostController),
):
    return await controller.update_post(item_id, model)


@router.delete("/{item_id}")
@RateLimiter(max_calls=10, cooldown_time=60)
async def delete_post(
    req: Request, item_id: int, controller: PostController = Depends(PostController)
):
    return await controller.delete_post(item_id)
