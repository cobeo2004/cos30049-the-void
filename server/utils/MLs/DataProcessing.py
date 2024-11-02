import joblib
import pandas as pd
from datetime import datetime
import os


class DataProcessing:

    def __init__(self) -> None:
        """
        Initialize the DataProcessing class.
        Load the scaler and encoder used in training.
        """

        # Load the scaler and encoder used in training
        self.scaler = joblib.load(
            os.path.join(os.path.dirname(__file__), "scaler.joblib")
        )
        self.encoder = joblib.load(
            os.path.join(os.path.dirname(__file__), "encoder.joblib")
        )

    def process_data(self, data: pd.DataFrame) -> pd.DataFrame:
        """
        Process the input data from the front end.

        Parameters:
            data (pd.DataFrame): Input data containing flight details.

        Returns:
            pd.DataFrame: Processed data ready for model prediction.
        """
        # check if data is a DataFrame
        try:
            if not isinstance(data, pd.DataFrame):
                raise ValueError("Input data must be a DataFrame.")
            # Convert dates and times to datetime objects
            data["Departure_datetime"] = pd.to_datetime(
                data["Departure_date"] + " " + data["Departure time"]
            )
            data["Arrival_datetime"] = pd.to_datetime(
                data["Arrival date"] + " " + data["Arrival time"]
            )

            # Calculate Flight Duration in minutes
            data["flight_duration_in_minutes"] = (
                data["Arrival_datetime"] - data["Departure_datetime"]
            ).dt.total_seconds() / 60

            # Extract date features from Departure_datetime
            data["year"] = data["Departure_datetime"].dt.year
            data["day_of_month"] = data["Departure_datetime"].dt.day
            data["month"] = data["Departure_datetime"].dt.month
            data["day_of_week"] = data["Departure_datetime"].dt.dayofweek

            # Calculate Departure_date_distance in days from today
            today = pd.to_datetime(datetime.now().date())
            data["departure_date_distance"] = (
                data["Departure_datetime"].dt.date - today.date()
            ).days

            # Handle 'Stops' column; default to 0 if not provided
            if "Stops" not in data.columns:
                data["stops"] = 0
            else:
                data["stops"] = (
                    data["Stops"].replace({"direct": 0, "1": 1, "2": 2}).astype(int)
                )

            # Select relevant columns
            numerical_cols = [
                "flight_duration_in_minutes",
                "year",
                "day_of_month",
                "month",
                "day_of_week",
                "departure_date_distance",
                "stops",
            ]
            categorical_cols = ["airline", "departure_city", "arrival_city"]

            # Scale numerical features using loaded scaler
            data[numerical_cols] = self.scaler.transform(data[numerical_cols])

            # Encode categorical features using loaded encoder
            encoded_features = self.encoder.transform(data[categorical_cols])
            encoded_feature_names = self.encoder.get_feature_names_out(categorical_cols)
            encoded_df = pd.DataFrame(
                encoded_features, columns=encoded_feature_names, index=data.index
            )

            # Combine numerical and encoded categorical features
            processed_data = pd.concat([data[numerical_cols], encoded_df], axis=1)

            return processed_data
        except Exception as e:
            raise e
