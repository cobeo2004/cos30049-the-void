from fastapi import FastAPI, Request, Response
from pydantic import BaseModel
from routers import user_router, prediction_router, craweler_router
from fastapi.middleware.cors import CORSMiddleware
from context import FastAPILifespan, RateLimiter
from utils.exceptions import ExceptionHandlerMiddleware
from utils.logger import logger, LoggingMiddleware
from routers import auth_router
from utils.CORS import cors_config

API_PREFIX = "/api/v1"

app = FastAPI(lifespan=FastAPILifespan)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_config.ORIGINS,
    allow_credentials=cors_config.ALLOW_CREDENTIALS,
    allow_methods=cors_config.ALLOW_METHODS,
    allow_headers=cors_config.ALLOW_HEADERS,
)


class PingModel(BaseModel):
    message: str


# Logging Middleware
app.add_middleware(LoggingMiddleware)

# Exception Handling Middleware
app.add_middleware(ExceptionHandlerMiddleware)


@app.get(f"{API_PREFIX}/ping")
@RateLimiter(max_calls=10, cooldown_time=60)
async def read_root(req: Request):
    logger.info("Ping!")
    return {"message": "pong"}


app.include_router(user_router, prefix=API_PREFIX)
app.include_router(prediction_router, prefix=API_PREFIX)
app.include_router(auth_router, prefix=API_PREFIX)
app.include_router(craweler_router, prefix=API_PREFIX)


def bootstrap():
    import uvicorn

    uvicorn.run("main:app", host="localhost", port=8000, reload=True)


if __name__ == "__main__":
    bootstrap()
