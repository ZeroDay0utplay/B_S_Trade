import pandas as pd
from sklearn.model_selection import train_test_split


def split(ds):
    df = pd.read_csv(f"../assets/{ds}.csv")
    if (ds=="Gold"):
        df = df.iloc[::-1]
        df["Open"] = df["Open"].str.replace(',', '')
        df["Open"] = df["Open"].astype('float64')