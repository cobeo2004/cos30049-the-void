from pydantic import BaseModel
from prisma.partials import UserAllFields


class AuthReturnModel(BaseModel):
    user: UserAllFields
    access_token: str
    refresh_token: str


class RefreshTokenModel(BaseModel):
    refresh_token: str