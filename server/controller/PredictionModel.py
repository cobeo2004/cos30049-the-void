from models.Predict import PredictRequestModel
from utils.MLs.DataProcessing import DataProcessing
from utils.MLs.MLProcessing import MLProcessing
from utils.MLs.ExtractDataFromCSV import ExtractDataFromCSV
import pandas as pd
import json
from fastapi.encoders import jsonable_encoder


class Controller:
    def __init__(self):
        self.processor = DataProcessing()
        self.mlProcessor = MLProcessing()
        self.dataExtractor = ExtractDataFromCSV()

    async def make_prediction(self, data: PredictRequestModel):
        # Convert PredictRequestModel to DataFrame
        ans_dict = jsonable_encoder(data)
        for k, v in ans_dict.items():
            ans_dict[k] = [v]
        df = pd.DataFrame.from_dict(ans_dict)
        # processed_data = self.processor.process_data(df)
        predictions = self.mlProcessor.predict(df)
        return {
            "predictions": predictions,
        }

    async def get_extract_data(self):
        return {
            "price_distribution": json.loads(self.dataExtractor.price_distribution_bar_chart()),
            "price_trend": json.loads(self.dataExtractor.price_trend_line_chart()),
            "seasonal_analysis": json.loads(self.dataExtractor.seasonal_analysis()),
        }
