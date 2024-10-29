
import pickle

#TODO: Viet Anh lam di em nhe
class MLProcessing:
    def __init__(self) -> None:
        # Chạy file germanflightprice_predict.ipynb để xuất model rồi lấy best_rf.pkl bỏ vào đây
        self.random_forest = pickle.load(open("best_rf.pkl", "rb"))

    def train_model(self, data):
        pass

    def predict(self, data):
        pass

    def evaluate(self, data):
        pass

