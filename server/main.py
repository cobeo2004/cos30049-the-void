from fastapi import FastAPI
from routers import user_router, prediction_router
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi.middleware.cors import CORSMiddleware
from context import FastAPILifespan
from utils.logger.middleware import LoggingMiddleware
from utils.logger import logger

app = FastAPI(lifespan=FastAPILifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)
logger_middleware = LoggingMiddleware()
app.add_middleware(BaseHTTPMiddleware, dispatch=logger_middleware)


@app.get("/")
def read_root():
    logger.info("Hello, World!")
    return {"Hello": "World"}


app.include_router(user_router)
app.include_router(prediction_router)
