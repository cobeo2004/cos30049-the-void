from typing import Optional
from fastapi import Depends, HTTPException, Request
from fastapi.security import HTTPBearer
from fastapi.security.http import HTTPAuthorizationCredentials
from .jwtHelper import verify_access_token
from utils import logger
from jose import JWTError
from fastapi import status


class JWTBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(JWTBearer, self).__init__(auto_error=auto_error)

    async def __call__(
        self, request: Request
    ) -> HTTPAuthorizationCredentials | Optional[HTTPException]:
        cred: HTTPAuthorizationCredentials = await super(JWTBearer, self).__call__(
            request
        )
        if cred:
            if not cred.scheme == "Bearer":
                raise HTTPException(
                    status_code=403, detail="Invalid authentication scheme."
                )
            token = cred.credentials
            if not self.verify_jwt(token):
                raise HTTPException(
                    status_code=403, detail="Invalid token or expired token."
                )
            return token

    def verify_jwt(self, jwt_token: str) -> bool:
        try:
            return verify_access_token(jwt_token)
        except JWTError:
            logger.error("[verify_jwt] Invalid token or expired token.")
            return False


async def get_current_user_id(token: str = Depends(JWTBearer())) -> str | None:
    payload = verify_access_token(token)
    if not payload:
        logger.error("[get_current_user_id] Could not validate credentials")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
        )
    return payload
