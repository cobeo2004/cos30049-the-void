"""
- File: prediction.py
- Author: Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
- Description: Router handling flight price prediction endpoints
"""

from fastapi import APIRouter, Depends, Request
from controller import PredictionController
from context.RateLimiterWrapper import RateLimiter
from models.Predict import PredictRequestModel, PredictResponseModel, ChartDataResponseModel
from utils.auth import get_current_user_id

# Initialize router with authentication requirement
router = APIRouter(
    prefix="/prediction",
    tags=["prediction"],
    dependencies=[Depends(get_current_user_id)],
)


@router.post("", response_model=PredictResponseModel)
@RateLimiter(max_calls=10, cooldown_time=60)
async def create_prediction(
    req: Request,
    data: PredictRequestModel,
    controller: PredictionController = Depends(PredictionController),
):
    """
    Generate flight price prediction

    Args:
        req: FastAPI request object
        data: Input data for prediction
        controller: Prediction controller instance

    Returns:
        dict: Prediction results and model metrics
    """
    return await controller.make_prediction(data)


@router.get("/charts/data", response_model=ChartDataResponseModel)
@RateLimiter(max_calls=10, cooldown_time=60)
async def get_extract_data(
    req: Request,
    controller: PredictionController = Depends(PredictionController),
):
    """
    Get data for visualization charts

    Args:
        req: FastAPI request object
        controller: Prediction controller instance

    Returns:
        dict: Data for various charts and visualizations
    """
    return await controller.get_extract_data()
