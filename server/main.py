from fastapi import FastAPI
from routers import user_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(CORSMiddleware,
                   allow_origins=["*"],
                   allow_credentials=True,
                   allow_methods=["GET", "POST", "PUT", "DELETE"],
                   allow_headers=["*"])


@app.get("/")
def read_root():
    return {"Hello": "World"}


app.include_router(user_router)
