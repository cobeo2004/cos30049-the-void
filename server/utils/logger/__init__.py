from .middleware import LoggingMiddleware
from .config import __loggerSingleton__ as logger

__all__ = ["logger", "LoggingMiddleware"]
