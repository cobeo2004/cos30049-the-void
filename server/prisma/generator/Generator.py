"""
- File: Generator.py
- Author: Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
- Description: Generates Prisma model partials for different data access patterns
"""

from prisma.models import Post, User

# Generate Post model partials
Post.create_partial("PostWithoutContent", exclude={"content"})
Post.create_partial("PostWithoutPublished", exclude={"published"})
Post.create_partial("PostWithoutContentAndPublished", exclude={"content", "published"})
Post.create_partial("PostAllFields", include={"id", "title", "content", "published"})

# Generate User model partials
User.create_partial("UserWithoutPassword", exclude={"password"})
User.create_partial("UserAllFields")
User.create_partial("UserForSignUp", exclude={"id"})
User.create_partial("UserForAuth", exclude={"id", "firstName", "lastName", "email"})
