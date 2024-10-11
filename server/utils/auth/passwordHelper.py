from passlib.context import CryptContext

password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(curr_password: str, hashed_password: str) -> bool:
    return password_context.verify(curr_password, hashed_password)


def hash_password(password: str) -> str:
    return password_context.hash(password)
