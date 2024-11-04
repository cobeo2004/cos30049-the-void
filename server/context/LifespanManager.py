"""
- File: LifespanManager.py
- Author: Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
- Description: Manages the lifecycle of the Prisma database connection
"""

from fastapi import FastAPI
from contextlib import asynccontextmanager
from .PrismaWrapper import __get_prisma__
from prisma import Prisma
from utils.logger import logger

# Global Prisma client instance
__prisma_singleton__: Prisma | None = __get_prisma__()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Manages the lifecycle of the FastAPI application

    Handles database connection setup and teardown:
    - Connects to database on startup
    - Disconnects from database on shutdown
    - Handles any connection errors

    Args:
        app: FastAPI application instance
    """
    global __prisma_singleton__
    try:
        # Connect to database on startup
        await __prisma_singleton__.connect()
        if __prisma_singleton__ is not None and __prisma_singleton__.is_connected():
            logger.info("Prisma connected")
            yield
            # Create new Prisma instance after yield
            __prisma_singleton__ = __get_prisma__()
    except Exception as e:
        logger.error("Prisma connection failed")
        logger.error(e)
    finally:
        # Ensure database connection is closed on shutdown
        logger.info("Prisma connection closed")
        await __prisma_singleton__.disconnect()
        __prisma_singleton__ = None
