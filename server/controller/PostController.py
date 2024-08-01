from prisma import Prisma
from models.Post import Model


class Controller:
    def __init__(self) -> None:
        pass

    async def get_posts(self, db: Prisma):
        return await db.post.find_many()

    async def get_post(self, item_id: int, db: Prisma):
        return await db.post.find_unique(where={
            "id": item_id
        })

    async def add_post(self, model: Model, db: Prisma):
        return await db.post.create({
            'content': model.content,
            'title': model.title,
            'published': model.published
        })

    async def delete_post(self, item_id: int, db: Prisma):
        return await db.post.delete(where={'id': item_id})

    async def update_post(self, item_id: int, model: Model, db: Prisma):
        return await db.post.update({'content': model.content, 'title': model.title, 'published': model.published}, {'id': item_id})
