import pickle
from utils.MLs.DataProcessing import DataProcessing
import os
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
import numpy as np

class MLProcessing:
    def __init__(self) -> None:
        # Chạy file germanflightprice_predict.ipynb để xuất model rồi lấy best_rf.pkl bỏ vào đây
        self.random_forest = pickle.load(open(os.path.join(os.path.dirname(__file__), "best_rf.pkl"), "rb"))
        self.processor = DataProcessing()

    def predict(self, data):
        # Process the data using DataProcessing
        processed_data = self.processor.process_data(data)
        # Predict the price using the random forest model
        predictions = self.random_forest.predict(processed_data)
        return {"prediction": predictions[0], "score": self.evaluate_model(processed_data, predictions)}

    def evaluate_model(self, processed_X_test, y_test):
        """
        Evaluate the model performance using various metrics

        Args:
            X_test: Test features
            y_test: True test values

        Returns:
            dict: Dictionary containing various model performance metrics
        """
        # Process test data

        # Make predictions
        y_pred = self.random_forest.predict(processed_X_test)

        # Calculate metrics
        mse = mean_squared_error(y_test, y_pred)
        rmse = np.sqrt(mse)
        mae = mean_absolute_error(y_test, y_pred)
        # r2 = r2_score(y_test, y_pred)

        return {
            'MSE': mse,
            'RMSE': rmse,
            'MAE': mae,
            # 'R2 Score': r2
        }
