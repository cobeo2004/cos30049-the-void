from fastapi import APIRouter, Depends
from controller import PredictionController
from utils.auth import get_current_user_id

router = APIRouter(prefix="/prediction", tags=["prediction"])


@router.get("", dependencies=[Depends(get_current_user_id)])
async def read_prediction(
    controller: PredictionController = Depends(PredictionController),
):
    return await controller.make_prediction()


@router.post("", dependencies=[Depends(get_current_user_id)])
async def create_prediction():
    return {"message": "Hello World"}
