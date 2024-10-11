from typing_extensions import Annotated, Doc
import pickle


class Controller:
    def __init__(self):
        self.model = pickle.load(open("../models/best_rf.pkl", "rb"))

    async def make_prediction(
        self, data: Annotated[any, Doc("The data to make a prediction on")]
    ):
        return self.model.predict(data)
