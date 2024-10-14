from fastapi import APIRouter, Depends
from controller import PostController
from prisma.partials import PostAllFields
from utils.auth import get_current_user_id

router = APIRouter(
    prefix="/user",
    tags=["user"],
    dependencies=[Depends(get_current_user_id)]
)


@router.get("")
async def read_posts(controller: PostController = Depends(PostController)):
    return await controller.get_posts()


@router.get("/{item_id}")
async def read_post_by_id(
    item_id: int, controller: PostController = Depends(PostController)
):
    return await controller.get_post(item_id)


@router.post("")
async def append_post(
    model: PostAllFields, controller: PostController = Depends(PostController)
):
    return await controller.add_post(model)


@router.put("/{item_id}")
async def update_post(
    item_id: int,
    model: PostAllFields,
    controller: PostController = Depends(PostController),
):
    return await controller.update_post(item_id, model)


@router.delete("/{item_id}")
async def delete_post(
    item_id: int, controller: PostController = Depends(PostController)
):
    return await controller.delete_post(item_id)
