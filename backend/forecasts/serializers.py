from rest_framework import serializers
from .models import Activity, TravelActivity, DietActivity, EnergyActivity, ImpactPrediction, Suggestion

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ['id', 'name', 'description', 'activity_type']


class TravelActivitySerializer(serializers.ModelSerializer):
    activity = serializers.PrimaryKeyRelatedField(queryset=Activity.objects.all())
    class Meta:
        model = TravelActivity
        fields = ['id', 'activity', 'distance_km', 'mode_of_transport', 'duration_hours']


class DietActivitySerializer(serializers.ModelSerializer):
    activity = serializers.PrimaryKeyRelatedField(queryset=Activity.objects.all())
    class Meta:
        model = DietActivity
        fields = ['id', 'activity', 'food_items', 'calories_consumed']


class EnergyActivitySerializer(serializers.ModelSerializer):
    activity = serializers.PrimaryKeyRelatedField(queryset=Activity.objects.all())
    class Meta:
        model = EnergyActivity
        fields = ['id', 'activity', 'electricity_usage_kwh', 'appliances_used']


class ImpactPredictionSerializer(serializers.ModelSerializer):
    activity = serializers.PrimaryKeyRelatedField(queryset=Activity.objects.all())
    class Meta:
        model = ImpactPrediction
        fields = ['id', 'activity', 'predicted_carbon_footprint', 'predicted_energy_usage', 'prediction_date']


class SuggestionSerializer(serializers.ModelSerializer):
    activity = serializers.PrimaryKeyRelatedField(queryset=Activity.objects.all())
    class Meta:
        model = Suggestion
        fields = ['id', 'activity_type', 'suggestion_text', 'impact_reduction_estimate', 'created_at']