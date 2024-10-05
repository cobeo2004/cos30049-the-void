from prisma import Prisma


def __get_prisma__() -> Prisma:
    """
    Creates and returns a new Prisma client instance.

    @returns Prisma: A new Prisma client instance.
    """
    prisma = Prisma()
    return prisma
