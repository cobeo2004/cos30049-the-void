
import pickle
from server.utils.MLs.DataProcessing import DataProcessing

class MLProcessing:
    def __init__(self) -> None:
        # Chạy file germanflightprice_predict.ipynb để xuất model rồi lấy best_rf.pkl bỏ vào đây
        self.random_forest = pickle.load(open("best_rf.pkl", "rb"))
        self.processor = DataProcessing()

    def predict(self, data):
        # Process the data using DataProcessing
            processed_data = self.processor.process_data(data)
            # Predict the price using the random forest model
            predictions = self.random_forest.predict(processed_data)
            return predictions

