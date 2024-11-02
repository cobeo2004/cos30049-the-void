import os
import pandas as pd
from utils.logger import logger


class AirplaneCarrierReader:
    def __init__(self):
        self.file = os.path.join(os.path.dirname(__file__), "airlines.csv")

    def get_airlines(self):
        df = pd.read_csv(self.file)
        logger.info(f"Read {len(df)} rows from {self.file}")
        return df
