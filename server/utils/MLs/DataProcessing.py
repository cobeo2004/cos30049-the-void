import joblib
import pandas as pd
from datetime import datetime
import os
from utils.logger import logger

class DataProcessing:

    def __init__(self) -> None:
        """
        Initialize the DataProcessing class.
        Load the scaler and encoder used in training.
        """

        # Load the scaler and encoder used in training
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
        Process the input data from the front end.

        Parameters:
            data (pd.DataFrame): Input data containing flight details.

        Returns:
            pd.DataFrame: Processed data ready for model prediction.
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

            # Calculate Flight Duration in minutes
            data["flight_duration_in_minutes"] = (
                data["Arrival_datetime"] - data["Departure_datetime"]
            ).dt.total_seconds() / 60

            # Add this new feature calculation
            data["departure_time_in_minutes_from_midnight"] = (
                data["Departure_datetime"].dt.hour * 60 + data["Departure_datetime"].dt.minute
            )

            # Extract date features from Departure_datetime
            data["year"] = data["Departure_datetime"].dt.year
            data["day_of_month"] = data["Departure_datetime"].dt.day
            data["month"] = data["Departure_datetime"].dt.month
            data["day_of_week"] = data["Departure_datetime"].dt.dayofweek

            # Calculate Departure_date_distance in days from today
            today = pd.to_datetime(datetime.now().date())
            data["departure_date_distance"] = (
                pd.to_datetime(data["Departure_datetime"].dt.date) - today
            ).dt.days

            # Handle 'Stops' column; default to 0 if not provided
            if "Stops" not in data.columns:
                data["stops"] = 0
            else:
                data["stops"] = (
                    data["Stops"].map({"direct": 0, "1": 1, "2": 2}).astype(int)
                )

            # Select relevant columns in the correct order based on training
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

            # Final features selected during training

            # Combine numerical and encoded categorical features
            processed_data = pd.concat([data[numerical_cols], encoded_df], axis=1)

            # Only keep the features that were selected during training
            processed_data = processed_data[self.selected_features]

            return processed_data
        except Exception as e:
            logger.error(f"Error in process_data: {str(e)}")
            raise e

