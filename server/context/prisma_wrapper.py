from contextvars import ContextVar
from prisma import Prisma
from typing import Callable, Optional
from typing_extensions import Annotated, Doc
from functools import wraps

# Context variable to store the Prisma client for the current async context
__context__: ContextVar[Optional[Prisma]
                        ] = ContextVar("prisma", default=None)


def __get_prisma__() -> Prisma:
    """
    Creates and returns a new Prisma client instance.

    @returns Prisma: A new Prisma client instance.
    """
    prisma = Prisma()
    return prisma


def __prisma_transaction__(func: Annotated[Callable, Doc("The async function to be decorated")]) -> Callable:
    """
    A decorator that manages Prisma database transactions for FastAPI route handlers.

    This decorator ensures that a Prisma client is available for the decorated function,
    handles connection management, and provides basic error handling.

    Author
    ----------
        Simon Nguyen

    Args
    ----------
        func (Callable): The async function to be decorated.

    Returns
    ----------
        Callable: A wrapped version of the input function with transaction management.

    Example
    ----------
        ```python
        @router.get("")
        @PrismaTransaction
        async def read_user(controller: PostController = Depends(PostGenerator)):
            prisma = prisma_context.get()
            return await controller.get_users(prisma)
        ```
    """

    @wraps(func)
    async def wrapper(*args, **kwargs):
        prisma = __context__.get()
        if prisma and prisma.is_connected():
            return await func(*args, **kwargs)

        prisma = __get_prisma__()
        __context__.set(prisma)

        try:
            await prisma.connect()
            result = await func(*args, **kwargs)
            await prisma.disconnect()
            return result
        except Exception as e:
            if prisma.is_connected():
                await prisma.disconnect()
            __context__.set(None)
            raise
        finally:
            __context__.set(None)

    return wrapper
