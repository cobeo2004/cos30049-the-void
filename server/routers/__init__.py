from .user import router as user_router
from .prediction import router as prediction_router
from .auth import router as auth_router
from .flight_prices import router as flight_prices_router

__all__ = ["user_router", "prediction_router", "auth_router", "flight_prices_router"]
