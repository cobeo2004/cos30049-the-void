"""
- File: middleware.py
- Author: Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
- Description: Global exception handling middleware for the FastAPI application
"""

from ..logger.config import __loggerSingleton__ as logger
from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware


class ExceptionHandlerMiddleware(BaseHTTPMiddleware):
    """
    Middleware for handling all exceptions in the application

    Provides consistent error responses for:
    - HTTP exceptions (4xx, 5xx)
    - Unexpected exceptions
    """

    async def dispatch(self, request: Request, call_next):
        """
        Process request and handle any exceptions

        Args:
            request: Incoming HTTP request
            call_next: Next middleware/handler in chain

        Returns:
            Response from next handler or error response
        """
        try:
            return await call_next(request)
        except HTTPException as http_exception:
            # Handle known HTTP exceptions
            return JSONResponse(
                status_code=http_exception.status_code,
                content={
                    "error": "Client Error",
                    "message": str(http_exception.detail),
                },
            )
        except Exception as e:
            # Handle unexpected exceptions
            logger.exception(str(e))
            return JSONResponse(
                status_code=500,
                content={
                    "error": "Internal Server Error",
                    "message": "An unexpected error occurred.",
                },
            )
