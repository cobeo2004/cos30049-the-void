from functools import wraps
import hashlib
import time
from fastapi import HTTPException, Request
from typing_extensions import Callable, Any


def RateLimiter(max_calls: int, cooldown_time: int):
    def decorator(fun: Callable[[Request], Any]) -> Callable[[Request], Any]:
        usages: dict[str, list[float]] = {}

        @wraps(fun)
        async def wrapper(req: Request) -> Any:
            if not req.client:
                raise ValueError("Request must have a client")
            ip_addr: str = req.client.host
            unique_ip: str = hashlib.sha256(ip_addr.encode()).hexdigest()

            curr_time: float = time.time()
            if unique_ip not in usages:
                usages[unique_ip] = [curr_time]
            timestamps: list[float] = usages[unique_ip]
            timestamps[:] = [
                time for time in timestamps if curr_time - time < cooldown_time
            ]
            if len(timestamps) < max_calls:
                timestamps.append(curr_time)
                return await fun(req)

            wait = cooldown_time - (curr_time - timestamps[0])
            raise HTTPException(
                status_code=429,
                detail=f"Too many requests, try again in {wait} seconds",
            )

        return wrapper

    return decorator
