import joblib
import numpy as np
from django.http import JsonResponse
from rest_framework.decorators import api_view

# Load the trained model
model = joblib.load("ml_model/disaster_model.pkl")

@api_view(['POST'])
def predict_disaster(request):
    try:
        data = request.data
        location = int(data.get("location", 0))
        disaster_type = int(data.get("disaster_type", 0))
        severity = float(data.get("severity", 0.0))
        lat = float(data.get("lat", 0.0))
        lon = float(data.get("lon", 0.0))

        # Prepare the input for the model
        input_data = np.array([[location, disaster_type, severity, lat, lon]])

        # Make a prediction
        prediction = model.predict(input_data)[0]

        return JsonResponse({"risk_level": "High" if prediction == 1 else "Low"})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)