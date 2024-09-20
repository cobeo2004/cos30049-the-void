from prisma.models import Post

Post.create_partial('PostWithoutContent', exclude={'content'})
Post.create_partial('PostWithoutPublished', exclude={'published'})
Post.create_partial('PostWithoutContentAndPublished',
                    exclude={'content', 'published'})
Post.create_partial('PostAllFields', include={
                    'id', 'title', 'content', 'published'})
