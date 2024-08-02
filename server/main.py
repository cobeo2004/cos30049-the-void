from fastapi import FastAPI
from routers import user_router

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


app.include_router(user_router)
