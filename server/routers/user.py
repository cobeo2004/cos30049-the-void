from fastapi import APIRouter, Depends
from controller import PostController
from prisma.partials import PostAllFields
from context import PrismaTransaction, PrismaContext

router = APIRouter(prefix="/user", tags=["user"])


@router.get("")
@PrismaTransaction
async def read_posts(controller: PostController = Depends(PostController)):
    context = PrismaContext.get()
    return await controller.get_posts(context)


@router.get("/{item_id}")
@PrismaTransaction
async def read_post_by_id(item_id: int, controller: PostController = Depends(PostController)):
    context = PrismaContext.get()
    return await controller.get_post(item_id, context)


@router.post("")
@PrismaTransaction
async def append_post(model: PostAllFields, controller: PostController = Depends(PostController)):
    context = PrismaContext.get()
    return await controller.add_post(model, context)


@router.put("/{item_id}")
@PrismaTransaction
async def update_post(item_id: int, model: PostAllFields, controller: PostController = Depends(PostController)):
    context = PrismaContext.get()
    return await controller.update_post(item_id, model, context)


@router.delete("/{item_id}")
@PrismaTransaction
async def delete_post(item_id: int, controller: PostController = Depends(PostController)):
    context = PrismaContext.get()
    return await controller.delete_post(item_id, context)
