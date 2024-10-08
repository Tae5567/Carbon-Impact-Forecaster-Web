import pandas as pd
import numpy as np

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
import joblib

# load dataset
df = pd.read_csv('/Users/eyitayo/Desktop/impact_forecasterWeb/backend/forecasts/activity.csv')
#show columns in dataset
print(df.columns)

#clean the data by filling missing values with 0
df = df.fillna(0)

#drop unnecessary columns
df = df.drop(['Activity ID', 'Activity Description'], axis=1)

#One-hot encoding of categorical (non-numerical) columns
df = pd.get_dummies(df, columns=['Activity Type', 'Mode of Transport', 'Food Items', 'Energy Type', 'Appliances Used'], drop_first=True)

#feature and target separation
X = df.drop('Carbon Footprint (kg CO2)', axis=1)
y = df['Carbon Footprint (kg CO2)']

#check that X and y have values
#print(f"X shape: {X.shape}")
#print(f"y shape: {y.shape}")


#split data into training ans testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

#normalize data
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

#Train the model
model = LinearRegression()
model.fit(X_train, y_train)

#save the model
joblib.dump(model, 'carbon_footprint.pkl')
print("Model trained and save successfully")