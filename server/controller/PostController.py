from prisma import Prisma
from prisma.partials import PostAllFields
from typing_extensions import Annotated, Doc
from context import PrismaSingleton


class Controller:

    def __init__(self):
        self.db = PrismaSingleton

    async def get_posts(self):
        return await self.db.post.find_many()

    async def get_post(self, item_id: int):
        return await self.db.post.find_unique(where={"id": item_id})

    async def add_post(
        self,
        model: Annotated[PostAllFields, Doc("The Post Model")],
    ):
        return await self.db.post.create(
            {
                "content": model.content,
                "title": model.title,
                "published": model.published,
            }
        )

    async def delete_post(
        self,
        item_id: Annotated[int, Doc("The id to be delete")],
    ):
        return await self.db.post.delete(where={"id": item_id})

    async def update_post(
        self,
        item_id: Annotated[int, Doc("The id to be update")],
        model: Annotated[PostAllFields, Doc("The new updated model")],
    ):
        return await self.db.post.update(
            {
                "content": model.content,
                "title": model.title,
                "published": model.published,
            },
            {"id": item_id},
        )
