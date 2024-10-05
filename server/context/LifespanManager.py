from fastapi import FastAPI
from contextlib import asynccontextmanager
from .PrismaWrapper import __get_prisma__
from prisma import Prisma
__prisma_singleton__ = Prisma()


@asynccontextmanager
async def lifespan(app: FastAPI):
    global __prisma_singleton__
    try:
        await __prisma_singleton__.connect()
        if __prisma_singleton__ is not None and __prisma_singleton__.is_connected():
            print("Prisma connected")
            yield
            __prisma_singleton__ = __get_prisma__()
    except Exception as e:
        print("Prisma connection failed")
        print(e)
    finally:
        print("Prisma connection closed")
        await __prisma_singleton__.disconnect()
        __prisma_singleton__ = None
