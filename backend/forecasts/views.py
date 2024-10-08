import joblib
import numpy as np
#from django.http import JsonResponse
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.utils import timezone
from .models import Activity, TravelActivity, DietActivity, EnergyActivity, ImpactPrediction, Suggestion
from .serializers import ActivitySerializer, TravelActivitySerializer, DietActivitySerializer, EnergyActivitySerializer, ImpactPredictionSerializer, SuggestionSerializer

#load saved model
model = joblib.load('forecasts/ml_models/carbon_footprint.pkl')

# Create your views here.

class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

class TravelActivityViewSet(viewsets.ModelViewSet):
    queryset = TravelActivity.objects.all()
    serializer_class = TravelActivitySerializer

class DietActivityViewSet(viewsets.ModelViewSet):
    queryset = DietActivity.objects.all()
    serializer_class = DietActivitySerializer

class EnergyActivityViewSet(viewsets.ModelViewSet):
    queryset = EnergyActivity.objects.all()
    serializer_class = EnergyActivitySerializer

class ImpactPredictionViewSet(viewsets.ModelViewSet):
    queryset = ImpactPrediction.objects.all()
    serializer_class = ImpactPredictionSerializer

    def create(self, request, *args, **kwargs):
        data = request.data

        # Extract relevant fields
        distance = float(data.get('distance_km', 0))
        duration = float(data.get('duration_hours', 0))
        calories = float(data.get('calories_consumed', 0))
        electricity_usage = float(data.get('electricity_usage', 0))

    
        # convert features into required format for prediction
        features = np.array([[distance, duration, calories, electricity_usage]])
        
        #Make the prediction using the ML model
        try:
            predicted_footprint = model.predict(features)[0] #make the predicition
        except Exception as e:
            return Response({"error": "Prediction failed.", "details": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

        # Fetch the activity object using the activity_id passed from the frontend
        try:
            #activity_id = int(data.get('activity_id'))
            activity = Activity.objects.get(id=data.get('activity_id'))
        except (Activity.DoesNotExist, ValueError, TypeError):
            return Response({"error": "Invalid activity ID"}, status=status.HTTP_404_NOT_FOUND)


        # Create and save prediction to database
        prediction = ImpactPrediction.objects.create(
            activity=activity,
            predicted_carbon_footprint=predicted_footprint,
            predicted_energy_usage=electricity_usage,
            prediction_date=timezone.now()
        )

        serializer = self.get_serializer(prediction)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


    
class SuggestionViewSet(viewsets.ModelViewSet):
    queryset = Suggestion.objects.all()
    serializer_class = SuggestionSerializer