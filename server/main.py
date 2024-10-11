from fastapi import FastAPI
from routers import user_router, prediction_router
from fastapi.middleware.cors import CORSMiddleware
from context import FastAPILifespan
from utils.exceptions import ExceptionHandlerMiddleware
from utils.logger import logger, LoggingMiddleware
from utils.dotEnv import EnvironmentVariables
from routers import auth_router

app = FastAPI(lifespan=FastAPILifespan)
origins = ["http://localhost:3000"]
methods = ["GET", "POST", "PUT", "DELETE"]
headers = ["*"]

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=methods,
    allow_headers=headers,
)

# Logging Middleware
app.add_middleware(LoggingMiddleware)

# Exception Handling Middleware
app.add_middleware(ExceptionHandlerMiddleware)

logger.info(EnvironmentVariables())


@app.get("/")
def read_root():
    logger.info("Hello, World!")
    return {"Hello": "World"}


app.include_router(user_router)
app.include_router(prediction_router)
app.include_router(auth_router)
