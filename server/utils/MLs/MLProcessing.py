"""
- File: MLProcessing.py
- Author: Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
- Description: Machine learning model processing and evaluation utilities
"""

import pickle
from utils.MLs.DataProcessing import DataProcessing
import os
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
import numpy as np

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

    def predict(self, data):
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
        return {"prediction": predictions[0], "score": self.evaluate_model(processed_data, predictions)}

    def evaluate_model(self, processed_X_test, y_test):
        """
        Evaluate model performance using various metrics

        Args:
            processed_X_test: Processed test features
            y_test: True test values

        Returns:
            dict: Dictionary containing model performance metrics (MSE, RMSE, MAE)
        """
        # Make predictions
        y_pred = self.random_forest.predict(processed_X_test)

        # Calculate metrics
        mse = mean_squared_error(y_test, y_pred)
        rmse = np.sqrt(mse)
        mae = mean_absolute_error(y_test, y_pred)

        return {
            'MSE': mse,
            'RMSE': rmse,
            'MAE': mae,
        }
