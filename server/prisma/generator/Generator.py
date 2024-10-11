from prisma.models import Post, User

Post.create_partial("PostWithoutContent", exclude={"content"})
Post.create_partial("PostWithoutPublished", exclude={"published"})
Post.create_partial("PostWithoutContentAndPublished", exclude={"content", "published"})
Post.create_partial("PostAllFields", include={"id", "title", "content", "published"})

User.create_partial("UserWithoutPassword", exclude={"password"})
User.create_partial("UserAllFields")
User.create_partial("UserForSignUp", exclude={"id"})
User.create_partial("UserForAuth", exclude={"id", "firstName", "lastName", "email"})
