"""
- File: MLProcessing.py
- Author: Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
- Description: Machine learning model processing and evaluation utilities
"""

import pickle
from utils.MLs.DataProcessing import DataProcessing
import os
from models import PredictResponseModel

class MLProcessing:
    """
    Handles machine learning model operations including prediction and evaluation

    Attributes:
        random_forest: Loaded random forest model for predictions
        processor: Data processing instance for feature preparation
    """

    def __init__(self) -> None:
        """
        Initialize ML processing with pre-trained model and data processor
        Note: Run germanflightprice_predict.ipynb to export model first
        """
        self.random_forest = pickle.load(open(os.path.join(os.path.dirname(__file__), "best_rf.pkl"), "rb"))
        self.processor = DataProcessing()

    def predict(self, data) -> PredictResponseModel:
        """
        Make price predictions using the random forest model

        Args:
            data: Input data for prediction

        Returns:
            dict: Prediction results and model evaluation metrics
        """
        # Process the data using DataProcessing
        processed_data = self.processor.process_data(data)
        # Predict the price using the random forest model
        predictions = self.random_forest.predict(processed_data)
        return {"predictions": predictions[0]}
