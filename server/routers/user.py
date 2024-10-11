from typing_extensions import Annotated
from fastapi import APIRouter, Depends
from controller import PostController
from prisma.partials import PostAllFields
from context import PrismaSingleton

router = APIRouter(prefix="/user", tags=["user"])


@router.get("")
async def read_posts(controller: PostController = Depends(PostController)):
    return await controller.get_posts(PrismaSingleton)


@router.get("/{item_id}")
async def read_post_by_id(
    item_id: int, controller: PostController = Depends(PostController)
):
    return await controller.get_post(item_id, PrismaSingleton)


@router.post("")
async def append_post(
    model: PostAllFields, controller: PostController = Depends(PostController)
):
    return await controller.add_post(model, PrismaSingleton)


@router.put("/{item_id}")
async def update_post(
    item_id: int,
    model: PostAllFields,
    controller: PostController = Depends(PostController),
):
    return await controller.update_post(item_id, model, PrismaSingleton)


@router.delete("/{item_id}")
async def delete_post(
    item_id: int, controller: PostController = Depends(PostController)
):
    return await controller.delete_post(item_id, PrismaSingleton)
