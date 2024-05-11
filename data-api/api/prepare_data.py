import pandas as pd
from sklearn.model_selection import train_test_split


def split(ds):
    df = pd.read_csv(f"../assets/{ds}.csv")
    train, test = train_test_split(df, test_size=0.1)
    train[["Date", "Open"]].to_csv(f'../assets/{ds}_train.csv', index=False)
    test.to_csv(f'../assets/{ds}_test.csv', index=False)


split("Apple")
split("Gold")