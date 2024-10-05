from fastapi import APIRouter, Depends
from controller import PredictionController

router = APIRouter(prefix="/prediction", tags=["prediction"])


@router.get("")
async def read_prediction(controller: PredictionController = Depends(PredictionController)):
    return await controller.make_prediction()


@router.post("")
async def create_prediction():
    return {"message": "Hello World"}
