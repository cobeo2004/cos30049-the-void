"""
- File: PredictionModel.py
- Author: Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
- Description: Controller handling flight price prediction operations
"""

from models.Predict import PredictRequestModel, PredictResponseModel, ChartDataResponseModel
from utils.MLs.DataProcessing import DataProcessing
from utils.MLs.MLProcessing import MLProcessing
from utils.MLs.ExtractDataFromCSV import ExtractDataFromCSV
import pandas as pd
import json
from fastapi.encoders import jsonable_encoder
from utils.logger import logger


class Controller:
    """
    Controller class handling flight price predictions and data analysis

    Handles:
    - Price predictions using ML models
    - Data extraction for visualizations
    - Data processing and transformation
    """

    def __init__(self):
        """Initialize with required processors and data extractors"""
        self.processor = DataProcessing()
        self.mlProcessor = MLProcessing()
        self.dataExtractor = ExtractDataFromCSV()

    async def make_prediction(self, data: PredictRequestModel) -> PredictResponseModel:
        """
        Generate flight price predictions

        Args:
            data: Input data for prediction

        Returns:
            dict: Prediction results including model metrics
        """
        # Convert request model to DataFrame
        ans_dict = jsonable_encoder(data)
        for k, v in ans_dict.items():
            ans_dict[k] = [v]
        df = pd.DataFrame.from_dict(ans_dict)

        # Generate predictions
        predictions = self.mlProcessor.predict(df)
        return predictions

    async def get_extract_data(self) -> ChartDataResponseModel:
        """
        Get data for various visualizations

        Returns:
            dict: Data for price distribution, trends, and seasonal analysis
        """
        res: ChartDataResponseModel = {
            "price_distribution": json.loads(self.dataExtractor.price_distribution_bar_chart()),
            "price_trend": json.loads(self.dataExtractor.price_trend_line_chart()),
            "seasonal_analysis": json.loads(self.dataExtractor.seasonal_analysis()),
        }
        return res
