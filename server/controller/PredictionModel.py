from models.Predict import PredictRequestModel


class Controller:
    def __init__(self):
        # self.model = pickle.load(open("../models/best_rf.pkl", "rb"))
        pass

    async def make_prediction(
        self,
        data: PredictRequestModel
    ):
        return {"data": data}
