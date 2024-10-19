from fastapi import Depends, FastAPI, Request
from pydantic import BaseModel
from routers import user_router, prediction_router, craweler_router
from fastapi.middleware.cors import CORSMiddleware
from context import FastAPILifespan, RateLimiter
from utils.exceptions import ExceptionHandlerMiddleware
from utils.logger import logger, LoggingMiddleware
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

class PingModel(BaseModel):
    message: str


# Logging Middleware
app.add_middleware(LoggingMiddleware)

# Exception Handling Middleware
app.add_middleware(ExceptionHandlerMiddleware)


@app.post("/ping")
@RateLimiter(max_calls=10, cooldown_time=60)
async def read_root(req: Request, model: PingModel):
    logger.info("Ping!")
    return model


app.include_router(user_router, prefix="/api/v1")
app.include_router(prediction_router, prefix="/api/v1")
app.include_router(auth_router, prefix="/api/v1")
app.include_router(craweler_router, prefix="/api/v1")
app.include_router
def bootstrap():
    import uvicorn
    uvicorn.run("main:app", host="localhost", port=8000, reload=True)


if __name__ == "__main__":
    bootstrap()
