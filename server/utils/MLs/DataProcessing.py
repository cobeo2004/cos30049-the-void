"""
- File: DataProcessing.py
- Author: Xuan Tuan Minh Nguyen, Trong Dat Hoang, Henry Nguyen
- Description: Data preprocessing utilities for machine learning models
"""

import joblib
import pandas as pd
from datetime import datetime
import os
from utils.logger import logger

class DataProcessing:
    """
    Handles data preprocessing for flight price prediction models

    Attributes:
        scaler: Loaded standard scaler for numerical features
        encoder: Loaded encoder for categorical features
        selected_features: List of features selected during model training
    """

    def __init__(self) -> None:
        """
        Initialize data processor with pre-trained scalers and encoders
        Loads:
        - Feature scaler
        - Categorical encoder
        - Selected feature list
        """
        self.scaler = joblib.load(
            os.path.join(os.path.dirname(__file__), "scaler.pkl")
        )
        self.encoder = joblib.load(
            os.path.join(os.path.dirname(__file__), "encoder.pkl")
        )
        self.selected_features = joblib.load(
            os.path.join(os.path.dirname(__file__), "features.pkl")
        )

    def process_data(self, data: pd.DataFrame) -> pd.DataFrame:
        """
        Process input data for model prediction

        Args:
            data: Input DataFrame containing flight details

        Returns:
            pd.DataFrame: Processed data ready for model prediction

        Raises:
            ValueError: If input data is not a DataFrame
            Exception: For any processing errors
        """
        try:
            if not isinstance(data, pd.DataFrame):
                raise ValueError("Input data must be a DataFrame.")

            # Convert dates and times to datetime objects
            data["Departure_datetime"] = pd.to_datetime(
                data["departure_date"] + " " + data["departure_time"]
            )
            data["Arrival_datetime"] = pd.to_datetime(
                data["arrival_date"] + " " + data["arrival_time"]
            )

            # Calculate flight duration in minutes
            data["flight_duration_in_minutes"] = (
                data["Arrival_datetime"] - data["Departure_datetime"]
            ).dt.total_seconds() / 60

            # Calculate departure time in minutes from midnight
            data["departure_time_in_minutes_from_midnight"] = (
                data["Departure_datetime"].dt.hour * 60 + data["Departure_datetime"].dt.minute
            )

            # Extract date features
            data["year"] = data["Departure_datetime"].dt.year
            data["day_of_month"] = data["Departure_datetime"].dt.day
            data["month"] = data["Departure_datetime"].dt.month
            data["day_of_week"] = data["Departure_datetime"].dt.dayofweek

            # Calculate days until departure
            today = pd.to_datetime(datetime.now().date())
            data["departure_date_distance"] = (
                pd.to_datetime(data["Departure_datetime"].dt.date) - today
            ).dt.days

            # Handle stops information
            if "Stops" not in data.columns:
                data["stops"] = 0
            else:
                data["stops"] = (
                    data["Stops"].map({"direct": 0, "1": 1, "2": 2}).astype(int)
                )

            # Select and process features
            numerical_cols = [
                "departure_date_distance",
                "stops",
                "flight_duration_in_minutes",
                "departure_time_in_minutes_from_midnight",
                "day_of_week",
                "day_of_month",
                "month",
                "year"
            ]
            categorical_cols = ["departure_city", "arrival_city", "airline"]

            # Scale numerical features
            data[numerical_cols] = self.scaler.transform(data[numerical_cols])

            # Encode categorical features
            encoded_features = self.encoder.transform(data[categorical_cols])
            encoded_feature_names = self.encoder.get_feature_names_out(categorical_cols)
            encoded_df = pd.DataFrame(
                encoded_features,
                columns=encoded_feature_names,
                index=data.index
            )

            # Combine features and select final set
            processed_data = pd.concat([data[numerical_cols], encoded_df], axis=1)
            processed_data = processed_data[self.selected_features]

            return processed_data
        except Exception as e:
            logger.error(f"Error in process_data: {str(e)}")
            raise e

