"""
- File: AirplaneCarrierReader.py
- Author: Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
- Description: Utility for reading airline carrier data from CSV file
"""

import os
import pandas as pd
from utils.logger import logger


class AirplaneCarrierReader:
    """
    Reader class for airline carrier data

    Handles loading and basic processing of airline carrier information
    from a CSV file containing airline details
    """

    def __init__(self):
        """Initialize reader with path to airlines CSV file"""
        self.file = os.path.join(os.path.dirname(__file__), "airlines.csv")

    def get_airlines(self):
        """
        Read and process the airlines data

        Returns:
            pandas.DataFrame: Processed dataframe containing airline data

        Note:
            Logs the number of rows read from the file
        """
        df = pd.read_csv(self.file)
        logger.info(f"Read {len(df)} rows from {self.file}")
        return df
