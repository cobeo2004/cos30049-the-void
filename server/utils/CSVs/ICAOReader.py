import os
import pandas as pd
from utils.logger import logger


class ICAOReader:
    def __init__(self):
        self.file = os.path.join(os.path.dirname(__file__), "iata-icao.csv")

    def get_iata_icao_df(self):
        try:
            df = pd.read_csv(self.file)
            logger.info(f"Read {len(df)} rows from {self.file}")
            df.dropna(inplace=True)
            return df
        except Exception as e:
            logger.error(f"Error reading {self.file}: {e}")
            return []
