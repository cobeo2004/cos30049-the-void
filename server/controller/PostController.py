"""
- File: PostController.py
- Author: Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
- Description: Controller handling blog post operations
"""

from prisma import Prisma
from prisma.partials import PostAllFields
from typing_extensions import Annotated, Doc
from context import PrismaSingleton


class Controller:
    """
    Controller class handling blog post operations

    Handles:
    - Post creation, retrieval, update, and deletion
    - Post listing and individual post access
    """

    def __init__(self):
        """Initialize with database connection"""
        self.db = PrismaSingleton

    async def get_posts(self):
        """
        Get all blog posts

        Returns:
            list: All blog posts in the database
        """
        return await self.db.post.find_many()

    async def get_post(
        self, item_id: int
    ):
        """
        Get a specific blog post by ID

        Args:
            item_id: ID of the post to retrieve

        Returns:
            dict: Post data if found, None otherwise
        """
        return await self.db.post.find_unique(where={"id": item_id})

    async def add_post(
        self,
        model: Annotated[PostAllFields, Doc("The Post Model")],
    ):
        """
        Create a new blog post

        Args:
            model: Post data including title, content, and published status

        Returns:
            dict: Created post data
        """
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
        """
        Delete a blog post

        Args:
            item_id: ID of the post to delete

        Returns:
            dict: Deleted post data
        """
        return await self.db.post.delete(where={"id": item_id})

    async def update_post(
        self,
        item_id: Annotated[int, Doc("The id to be update")],
        model: Annotated[PostAllFields, Doc("The new updated model")],
    ):
        """
        Update an existing blog post

        Args:
            item_id: ID of the post to update
            model: Updated post data

        Returns:
            dict: Updated post data
        """
        return await self.db.post.update(
            {
                "content": model.content,
                "title": model.title,
                "published": model.published,
            },
            {"id": item_id},
        )
