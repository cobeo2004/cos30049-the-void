from dataclasses import dataclass
from dotenv import load_dotenv
import os

load_dotenv()


@dataclass
class EnvironmentVariables:
    DATABASE_URL: str = os.getenv("DATABASE_URL")
    SECRET_KEY: str = os.getenv("SECRET_KEY")
    REFRESH_SECRET_KEY: str = os.getenv("REFRESH_SECRET_KEY")
    JWT_ALGORITHM: str = os.getenv("JWT_ALGORITHM")
    TOKEN_WILL_EXPIRES_MIN: int = int(os.getenv("TOKEN_WILL_EXPIRES_MIN"))


env = EnvironmentVariables()
