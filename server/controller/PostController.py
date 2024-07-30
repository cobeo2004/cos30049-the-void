from prisma import Prisma


class Controller:
    def __init__(self) -> None:
        pass

    async def get_users(self, db: Prisma):
        return await db.post.find_many()

    async def get_user(self, item_id: int, db: Prisma):
        return await db.post.find_unique(where={
            "id": item_id
        })
