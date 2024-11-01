
import pickle
from server.utils.MLs.DataProcessing import DataProcessing

class MLProcessing:
    def __init__(self) -> None:
        # Chạy file germanflightprice_predict.ipynb để xuất model rồi lấy best_rf.pkl bỏ vào đây
        self.random_forest = pickle.load(open("best_rf.pkl", "rb"))

    def predict(self, data):
        # Process the data using DataProcessing
            processor = DataProcessing()
            processed_data = processor.process_data(data)
            # Predict the price using the random forest model
            predictions = self.random_forest.predict(processed_data)
            return predictions

