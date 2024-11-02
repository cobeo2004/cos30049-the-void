from fastapi import APIRouter, Depends, Request
from controller import PredictionController
from context.RateLimiterWrapper import RateLimiter
from models.Predict import PredictRequestModel
from utils.auth import get_current_user_id

router = APIRouter(
    prefix="/prediction",
    tags=["prediction"],
    dependencies=[Depends(get_current_user_id)],
)




@router.post("")
@RateLimiter(max_calls=10, cooldown_time=60)
async def create_prediction(
    req: Request,
    data: PredictRequestModel,
    controller: PredictionController = Depends(PredictionController),
):
    return await controller.make_prediction(data)
