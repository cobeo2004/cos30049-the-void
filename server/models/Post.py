"""
- File: Post.py
- Author: Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
- Description: Defines the data model for blog posts
"""

from typing import Optional
from pydantic import BaseModel
from typing_extensions import Annotated, Doc


class Model(BaseModel):
    """
    Data model for blog posts

    Attributes:
        title: The title of the post
        content: The main content of the post (optional)
        published: Flag indicating if the post is published (optional)
    """
    title: Annotated[str, Doc("""The title of the post""")]
    content: Annotated[Optional[str], Doc("""The content of the doc""")] = ''
    published: Annotated[Optional[bool], Doc(
        """Is the post published ?""")] = False
