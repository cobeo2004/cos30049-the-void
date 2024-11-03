"""
- File: middleware.py
- Author: Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
- Description: Middleware for logging HTTP requests and responses
"""

import time
import uuid
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from typing import Callable
from .config import __loggerSingleton__


class LoggingMiddleware(BaseHTTPMiddleware):
    """
    Middleware for logging HTTP request/response details and timing

    Logs:
    - Request start with unique ID
    - Request headers (debug level)
    - Request completion status and duration
    - Any errors that occur during request processing
    """

    async def dispatch(self, request: Request, call_next: Callable):
        """
        Process and log each request/response cycle

        Args:
            request: Incoming HTTP request
            call_next: Next middleware/handler in chain

        Returns:
            Response from next handler

        Raises:
            Exception: Propagates any errors after logging them
        """
        # Generate unique ID for request tracking
        request_id = str(uuid.uuid4())
        request.state.request_id = request_id

        # Log request start
        __loggerSingleton__.info(
            f"Request started: {request.method} {request.url} - ID: {request_id}"
        )
        __loggerSingleton__.debug(f"Request headers: {request.headers}")

        start_time = time.time()

        try:
            # Process request and measure duration
            response = await call_next(request)
            duration = time.time() - start_time

            # Log successful completion
            __loggerSingleton__.info(
                f"Request completed: {request.method} {request.url} - ID: {request_id} - Status: {response.status_code} - Duration: {duration:.2f}s"
            )

            return response
        except Exception as e:
            # Log any errors that occur
            duration = time.time() - start_time
            __loggerSingleton__.error(
                f"Request failed: {request.method} {request.url} - ID: {request_id} - Error: {str(e)} - Duration: {duration:.2f}s"
            )
            raise
