from fastapi import APIRouter, Depends
from prisma import Prisma
from contextlib import asynccontextmanager
from controller import PostController

router = APIRouter(prefix="/user", tags=["user"])


@asynccontextmanager
async def get_prisma():
    db = Prisma()
    await db.connect()
    try:
        yield db
    finally:
        await db.disconnect()


@asynccontextmanager
async def get_post_controller():
    controller = PostController()
    try:
        yield controller
    except Exception as e:
        raise e


async def get_db():
    async with get_prisma() as db:
        yield db


async def get_controller():
    async with get_post_controller() as controller:
        yield controller


@router.get("")
async def read_users(db: Prisma = Depends(get_db), controller: PostController = Depends(get_controller)):
    return await controller.get_users(db)


@router.get("/{item_id}")
async def read_user(item_id: int, db: Prisma = Depends(get_db), controller: PostController = Depends(get_controller)):
    return await controller.get_user(item_id, db)
