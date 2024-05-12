import pandas as pd
from statsmodels.tsa.arima.model import ARIMAResults
import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["http://192.168.1.32:4200", "http://localhost:4200"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

stocks = {
    "1": "Apple",
    "2": "Gold"
}

def validArray(id):
    df = pd.read_csv(f"../assets/{stocks[id]}_train.csv")
    df.reset_index(drop=True, inplace=True)
    if (id == "2"):
        df["Open"] = df["Open"].str.replace(',', '')
        df["Open"] = df["Open"].astype('float64')
    dates = [x for x in df.Date]
    values = [x for x in df.Open]
    if (id=="2"):
        dates = dates[::-1]
        values = values[::-1]
    return {"Date": dates, "Values": values}


@app.get("/stocks/{id}")
async def getStocksData(id: str):
    return validArray(id)

@app.get("/predict/{id}")
async def predict(id: str):
    df = pd.read_csv(f"../assets/{stocks[id]}_test.csv")
    labels = [x for x in df.Date]
    predictions = [x for x in df.Open]
    # loaded_model = ARIMAResults.load('../assets/arima_model.pkl')
    # predictions = loaded_model.predict(start=3900, end=4000)
    # predictions = predictions.tolist()
    return {"labels": labels, "predictions": predictions}