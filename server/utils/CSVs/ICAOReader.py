"""
- File: ICAOReader.py
- Author: Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
- Description: Utility for reading and processing IATA/ICAO airport code data from CSV
"""

import os
import pandas as pd
from utils.logger import logger


class ICAOReader:
    """
    Reader class for IATA/ICAO airport code data

    Handles loading and basic processing of airport data from CSV file
    containing IATA codes, ICAO codes, and airport information
    """

    def __init__(self):
        """Initialize reader with path to CSV file"""
        self.file = os.path.join(os.path.dirname(__file__), "iata-icao.csv")

    def get_iata_icao_df(self):
        """
        Read and process the IATA/ICAO data

        Returns:
            pandas.DataFrame: Processed dataframe containing airport data

        Note:
            - Drops any rows with missing values
            - Logs the number of rows read
        """
        try:
            df = pd.read_csv(self.file)
            logger.info(f"Read {len(df)} rows from {self.file}")
            df.dropna(inplace=True)
            return df
        except Exception as e:
            logger.error(f"Error reading {self.file}: {e}")
            return []
