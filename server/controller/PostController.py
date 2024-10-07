from prisma import Prisma
from models.Post import Model
from prisma.partials import PostAllFields
from typing_extensions import Annotated, Doc


class Controller:

    async def get_posts(self, db: Annotated[Prisma, Doc("The Prisma client instance")]):
        return await db.post.find_many()

    async def get_post(self, item_id: int, db: Annotated[Prisma, Doc("The Prisma client instance")]):
        return await db.post.find_unique(where={
            "id": item_id
        })

    async def add_post(self, model: Annotated[PostAllFields, Doc("The Post Model")], db: Annotated[Prisma, Doc("The Prisma client instance")]):
        return await db.post.create({
            'content': model.content,
            'title': model.title,
            'published': model.published
        })

    async def delete_post(self, item_id: Annotated[int, Doc("The id to be delete")], db: Annotated[Prisma, Doc("The Prisma client instance")]):
        return await db.post.delete(where={'id': item_id})

    async def update_post(self, item_id: Annotated[int, Doc("The id to be update")], model: Annotated[PostAllFields, Doc("The new updated model")], db: Prisma):
        return await db.post.update({'content': model.content, 'title': model.title, 'published': model.published}, {'id': item_id})
