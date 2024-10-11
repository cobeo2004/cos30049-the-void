from fastapi import FastAPI
from routers import user_router, prediction_router
from fastapi.middleware.cors import CORSMiddleware
from context import FastAPILifespan
from utils.exceptions import ExceptionHandlerMiddleware
from utils.logger import logger, LoggingMiddleware

app = FastAPI(lifespan=FastAPILifespan)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Logging Middleware
app.add_middleware(LoggingMiddleware)

# Exception Handling Middleware
app.add_middleware(ExceptionHandlerMiddleware)


@app.get("/")
def read_root():
    logger.info("Hello, World!")
    return {"Hello": "World"}


app.include_router(user_router)
app.include_router(prediction_router)
