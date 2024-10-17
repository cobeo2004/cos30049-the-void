from fastapi import FastAPI
from contextlib import asynccontextmanager
from .PrismaWrapper import __get_prisma__
from prisma import Prisma
from utils.logger import logger
__prisma_singleton__: Prisma | None = __get_prisma__()


@asynccontextmanager
async def lifespan(app: FastAPI):
    global __prisma_singleton__
    try:
        await __prisma_singleton__.connect()
        if __prisma_singleton__ is not None and __prisma_singleton__.is_connected():
            logger.info("Prisma connected")
            yield
            __prisma_singleton__ = __get_prisma__()
    except Exception as e:
        logger.error("Prisma connection failed")
        logger.error(e)
    finally:
        logger.info("Prisma connection closed")
        await __prisma_singleton__.disconnect()
        __prisma_singleton__ = None
