import pandas as pd
# from statsmodels.tsa.arima.model import ARIMAResults
import json
import pickle
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.models import load_model 
import tensorflow as tf
from sklearn.preprocessing import MinMaxScaler
import numpy as np

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
    dates = [x for x in df.Date]
    values = [x for x in df.Open]
    return {"Date": dates, "Values": values}


def prediction(model, df):
    df['Date'] = pd.to_datetime(df['Date'], format='%Y-%m-%d')
    scaler = MinMaxScaler().fit(np.array(df['Open']).reshape(-1,1))
    df = scaler.transform(np.array(df['Open']).reshape(-1,1))
    prediction = model.predict(df)
    prediction = scaler.inverse_transform(prediction)
    return prediction



@app.get("/stocks/{id}")
async def getStocksData(id: str):
    return validArray(id)


@app.get("/predict/{id}")
async def predictData(id: str):
    df_test = pd.read_csv(f"../assets/{stocks[id]}_test.csv")
    labels = [x for x in df_test.Date]
    predictions = [x for x in df_test.Open]
    # loaded_model = tf.keras.models.load_model("../assets/model/gru.h5")
    # predictions = prediction(loaded_model, df_test)
    # predictions = [float(x[0]) for x in predictions]
    return {"labels": labels, "predictions": predictions}