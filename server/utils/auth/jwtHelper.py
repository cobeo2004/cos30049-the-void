from fastapi import HTTPException
from jose import jwt, JWTError
from prisma.models import User
from utils.dotEnv import env
from utils import logger
from typing_extensions import Any
from datetime import datetime, timedelta


def create_access_token(data: User | Any) -> str:
    logger.info(f"Data: {data}")
    expires_delta = datetime.now() + timedelta(minutes=env.TOKEN_WILL_EXPIRES_MIN)
    print(f"Expires delta: {expires_delta}")
    encode_data = dict(exp=expires_delta, sub=data.id)
    encoded = jwt.encode(encode_data, env.SECRET_KEY, algorithm=env.JWT_ALGORITHM)
    print(f"Encoded access token: {encoded}")
    return encoded


def create_refresh_token(data: User | Any) -> str:
    expires_delta = datetime.now() + timedelta(days=env.REFRESH_TOKEN_WILL_EXPIRES_DAYS)
    print(f"Expires delta: {expires_delta}")
    encode_data = dict(exp=expires_delta, sub=data.id)
    encoded = jwt.encode(
        encode_data, env.REFRESH_SECRET_KEY, algorithm=env.JWT_ALGORITHM
    )
    print(f"Encoded refresh token: {encoded}")
    return encoded


def verify_access_token(token: str) -> dict[str, Any] | Any:
    try:
        payload = jwt.decode(token, env.SECRET_KEY, algorithms=[env.JWT_ALGORITHM])
        print(f"Payload of verified access token: {payload}")
        if datetime.fromtimestamp(payload["exp"]) < datetime.now():
            logger.error("[verify_access_token] Access token expired")
            raise HTTPException(status_code=401, detail="Access token expired")
        return payload
    except JWTError:
        logger.error("[verify_access_token] Invalid access token")
        raise HTTPException(status_code=401, detail="Access token expired")


def verify_refresh_token(token: str) -> dict[str, Any] | Any:
    try:
        payload = jwt.decode(token, env.REFRESH_SECRET_KEY, algorithms=[env.JWT_ALGORITHM])
        if datetime.fromtimestamp(payload["exp"]) < datetime.now():
            logger.error("[verify_refresh_token] Refresh token expired")
            raise HTTPException(status_code=401, detail="Refresh token expired")
        return payload
    except JWTError:
        logger.error("[verify_refresh_token] Invalid refresh token")
        raise HTTPException(status_code=401, detail="Invalid refresh token")
