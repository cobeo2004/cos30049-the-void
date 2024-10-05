from fastapi import FastAPI
from routers import user_router, prediction_router
from fastapi.middleware.cors import CORSMiddleware
from context import FastAPILifespan

app = FastAPI(lifespan=FastAPILifespan)
app.add_middleware(CORSMiddleware,
                   allow_origins=["*"],
                   allow_credentials=True,
                   allow_methods=["GET", "POST", "PUT", "DELETE"],
                   allow_headers=["*"])


@app.get("/")
def read_root():
    return {"Hello": "World"}


app.include_router(user_router)
app.include_router(prediction_router)
