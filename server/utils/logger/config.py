import logging
from fastapi import FastAPI, Request
from typing import Callable
import time
import uuid

logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)

__loggerSingleton__ = logging.getLogger(__name__)
