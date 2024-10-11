import time
import uuid
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from typing import Callable
from .config import __loggerSingleton__


class LoggingMiddleware(BaseHTTPMiddleware):
    # def __init__(self, app: FastAPI):
    #     self.app = app

    async def dispatch(self, request: Request, call_next: Callable):
        request_id = str(uuid.uuid4())
        request.state.request_id = request_id

        __loggerSingleton__.info(
            f"Request started: {request.method} {request.url} - ID: {request_id}"
        )
        __loggerSingleton__.debug(f"Request headers: {request.headers}")

        start_time = time.time()

        try:
            response = await call_next(request)

            duration = time.time() - start_time
            __loggerSingleton__.info(
                f"Request completed: {request.method} {request.url} - ID: {request_id} - Status: {response.status_code} - Duration: {duration:.2f}s"
            )

            return response
        except Exception as e:
            duration = time.time() - start_time
            __loggerSingleton__.error(
                f"Request failed: {request.method} {request.url} - ID: {request_id} - Error: {str(e)} - Duration: {duration:.2f}s"
            )
            raise
