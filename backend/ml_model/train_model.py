import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib

# Load the dataset
df = pd.read_csv("ml_model/indian_disaster_data.csv")

# Normalize column names (remove spaces & standardize case)
df.columns = df.columns.str.strip().str.lower()  # Convert to lowercase

# Convert categorical data to numerical
df["disaster_type"] = df["disaster_type"].astype("category").cat.codes
df["city"] = df["city"].astype("category").cat.codes  # 'location' → 'city'

# Select features and target
X = df[["city", "disaster_type", "severity", "latitude", "longitude"]]
y = df["affected_population"]  # Adjust target if needed

# Split the dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save the trained model
joblib.dump(model, "ml_model/disaster_model.pkl")

print("Model trained and saved successfully!")
