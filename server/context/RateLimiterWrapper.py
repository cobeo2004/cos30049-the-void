from functools import wraps
import hashlib
import time
from fastapi import HTTPException, Request
from typing_extensions import Callable, Any


def RateLimiter(max_calls: int, cooldown_time: int):
    """
    Decorator to limit the number of API requests to a specific endpoint.

   Params
    - `max_calls` (int): Maximum number of calls allowed within the cooldown time.
    - `cooldown_time` (int): Cooldown time in seconds.

    Returns
    - `decorator`: Decorator to limit the number of API requests to a specific endpoint.

    Raises
    - `ValueError`: If the request does not have a client.
    - `HTTPException` (429): If the number of calls is greater than the maximum allowed.

    Example
    ```python
        @RateLimiter(max_calls=10, cooldown_time=60)
        # Must have a Request parameter
        async def my_endpoint(req: Request, other_param: str):
            return {"message": "Hello World"}
    ```
    """

    def decorator(fun: Callable[..., Any]) -> Callable[..., Any]:
        usages: dict[str, list[float]] = {}

        @wraps(fun)
        async def wrapper(*args: Any, **kwargs: Any) -> Any:
            req: Request = next((arg for arg in args if isinstance(arg, Request)), None)
            if not req:
                req = kwargs.get('req')
            if not req or not isinstance(req, Request):
                raise ValueError("Request parameter is required")
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
                return await fun(*args, **kwargs)

            wait = cooldown_time - (curr_time - timestamps[0])
            raise HTTPException(
                status_code=429,
                detail=f"Too many requests, try again in {wait} seconds",
            )

        return wrapper

    return decorator
