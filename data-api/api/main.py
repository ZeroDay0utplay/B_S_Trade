from fastapi import FastAPI
import pandas as pd
import pickle

app = FastAPI()

stocks = {
    "1": "Apple",
    "2": "Gold"
}

@app.get("/stocks/{id}")
async def getStocksData(id: str):
    df = pd.read_csv(f"../assets/{stocks[id]}_train.csv")
    return df.head()

@app.get("/predict/{id}")
async def predict(id: str):
    with open("../assets/model.pkl", "rb") as modelFile:
        model = pickle.load(modelFile)
        print(model)