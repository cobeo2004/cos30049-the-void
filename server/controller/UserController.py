"""
- File: UserController.py
- Author: Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
- Description: Controller handling user management operations
"""

from typing import Optional
from context import PrismaSingleton
from prisma.partials import UserForSignUp
from utils.auth.passwordHelper import verify_password, hash_password


class Controller:
    """
    Controller class handling user CRUD operations

    Handles:
    - User listing and retrieval
    - User creation and updates
    - User deletion
    - Password verification and hashing
    """

    def __init__(self):
        """Initialize with database connection"""
        self.db = PrismaSingleton

    async def get_users(self):
        """Get all users from database"""
        return await self.db.user.find_many()

    async def get_user(self, user_id: str):
        """
        Get a specific user by ID

        Args:
            user_id: ID of user to retrieve

        Returns:
            dict: User data if found
        """
        return await self.db.user.find_unique(where={"id": user_id})

    async def create_user(self, user: UserForSignUp):
        """
        Create a new user

        Args:
            user: User data for creation

        Returns:
            dict: Created user data
        """
        return await self.db.user.create(data=user)

    async def update_user(self, user_id: str, user: Optional[UserForSignUp]):
        """
        Update an existing user

        Args:
            user_id: ID of user to update
            user: Updated user data

        Returns:
            dict: Updated user data
        """
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
        """
        Delete a user

        Args:
            user_id: ID of user to delete

        Returns:
            dict: Deleted user data
        """
        return await self.db.user.delete(where={"id": user_id})
