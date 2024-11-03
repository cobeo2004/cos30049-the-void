"""
- File: main.py
- Author: Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
- Description: Main FastAPI application entry point and configuration
"""

from fastapi import FastAPI, Request, Response
from pydantic import BaseModel
from routers import user_router, prediction_router, flight_prices_router
from fastapi.middleware.cors import CORSMiddleware
from context import FastAPILifespan, RateLimiter
from utils.exceptions import ExceptionHandlerMiddleware
from utils.logger import logger, LoggingMiddleware
from routers import auth_router
from utils.CORS import cors_config

# API version prefix for all routes
API_PREFIX = "/api/v1"

# Initialize FastAPI application with lifespan management
app = FastAPI(lifespan=FastAPILifespan)

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_config.ORIGINS,
    allow_credentials=cors_config.ALLOW_CREDENTIALS,
    allow_methods=cors_config.ALLOW_METHODS,
    allow_headers=cors_config.ALLOW_HEADERS,
)


class PingModel(BaseModel):
    """Model for ping response"""
    message: str


# Add logging middleware for request tracking
app.add_middleware(LoggingMiddleware)

# Add exception handling middleware
app.add_middleware(ExceptionHandlerMiddleware)


@app.get(f"{API_PREFIX}/ping")
@RateLimiter(max_calls=10, cooldown_time=60)
async def read_root(req: Request):
    """Health check endpoint"""
    logger.info("Ping!")
    return {"message": "pong"}


# Register all route handlers
app.include_router(user_router, prefix=API_PREFIX)
app.include_router(prediction_router, prefix=API_PREFIX)
app.include_router(auth_router, prefix=API_PREFIX)
app.include_router(flight_prices_router, prefix=API_PREFIX)


def bootstrap():
    """Bootstrap function to run the application"""
    import uvicorn
    uvicorn.run("main:app", host="localhost", port=8000, reload=True)


if __name__ == "__main__":
    bootstrap()
