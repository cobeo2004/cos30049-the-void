from models.Predict import PredictRequestModel
from utils.MLs.DataProcessing import DataProcessing
from utils.MLs.MLProcessing import MLProcessing
import pandas as pd
from fastapi.encoders import jsonable_encoder
class Controller:
    def __init__(self):
        self.processor = DataProcessing()
        self.mlProcessor = MLProcessing()

    async def make_prediction(
        self,
        data: PredictRequestModel
    ):
        # Convert PredictRequestModel to DataFrame
        ans_dict = jsonable_encoder(data)
        for k, v in ans_dict.items():
            ans_dict[k] = [v]
        df = pd.DataFrame.from_dict(ans_dict)
        # processed_data = self.processor.process_data(df)
        predictions = self.mlProcessor.predict(df)
        return {"predictions": predictions}
