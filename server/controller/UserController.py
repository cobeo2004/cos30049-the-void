from typing import Optional
from context import PrismaSingleton
from prisma.partials import UserForSignUp

from utils.auth.passwordHelper import verify_password, hash_password


class Controller:
    def __init__(self):
        self.db = PrismaSingleton

    async def get_users(self):
        return await self.db.user.find_many()

    async def get_user(self, user_id: str):
        return await self.db.user.find_unique(where={"id": user_id})

    async def create_user(self, user: UserForSignUp):
        return await self.db.user.create(data=user)

    async def update_user(self, user_id: str, user: Optional[UserForSignUp]):
        found_user = await self.get_user(user_id)
        if not verify_password(user.password, found_user.password):
            hashed_password = hash_password(user.password)
            return await self.db.user.update(
                where={"id": user_id},
                data={
                    "email": user.email,
                    "firstName": user.firstName,
                    "lastName": user.lastName,
                    "username": user.username,
                    "password": hashed_password,
                },
            )
        return await self.db.user.update(where={"id": user_id}, data=user)

    async def delete_user(self, user_id: str):
        return await self.db.user.delete(where={"id": user_id})
