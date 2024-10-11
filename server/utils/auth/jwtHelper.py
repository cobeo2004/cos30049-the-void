from jose import jwt, JWTError
from prisma.models import User
from utils.dotEnv import env
from utils import logger
from typing_extensions import Any
from datetime import datetime, timedelta


def create_access_token(data: User | Any) -> str:
    logger.info(f"Data: {data}")
    expires_delta = datetime.now() + timedelta(minutes=env.TOKEN_WILL_EXPIRES_MIN)
    encode_data = {"exp": expires_delta, "sub": data.id}
    encoded = jwt.encode(encode_data, env.SECRET_KEY, algorithm=env.JWT_ALGORITHM)
    print(f"Encoded access token: {encoded}")
    return encoded


def create_refresh_token(data: User | Any) -> str:
    expires_delta = datetime.now() + timedelta(days=7)
    encode_data = {"exp": expires_delta, "sub": data.id}
    return jwt.encode(encode_data, env.REFRESH_SECRET_KEY, algorithm=env.JWT_ALGORITHM)


def verify_access_token(token: str) -> dict[str, Any] | Any:
    try:
        return jwt.decode(token, env.SECRET_KEY, algorithms=[env.JWT_ALGORITHM])
    except JWTError:
        logger.error("Invalid access token")
        return None


def verify_refresh_token(token: str) -> dict[str, Any] | Any:
    try:
        return jwt.decode(token, env.REFRESH_SECRET_KEY, algorithms=[env.JWT_ALGORITHM])
    except JWTError:
        logger.error("Invalid refresh token")
        return None
