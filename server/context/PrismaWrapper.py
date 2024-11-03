"""
- File: PrismaWrapper.py
- Author: Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
- Description: Provides a wrapper for Prisma database client initialization
"""

from prisma import Prisma


def __get_prisma__() -> Prisma:
    """
    Creates and returns a new Prisma client instance.
    This function ensures we have a clean database connection for each request.

    Returns:
        Prisma: A new Prisma client instance ready for database operations
    """
    prisma = Prisma()
    return prisma
