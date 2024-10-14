from fastapi import APIRouter, Depends
from controller import PredictionController
from utils.auth import get_current_user_id

router = APIRouter(prefix="/prediction", tags=["prediction"], dependencies=[Depends(get_current_user_id)])


@router.get("")
async def read_prediction(
    controller: PredictionController = Depends(PredictionController),
):
    return await controller.make_prediction()


@router.post("")
async def create_prediction():
    return {"message": "Hello World"}
