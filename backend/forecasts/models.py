from django.db import models
from django.contrib.auth.models import User

# Create your models here.

#User Model: to store user details

#Activity Model: to store information about different activities
class Activity(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    activity_type = models.CharField(max_length=50, choices=[('travel', 'Travel'), ('diet', 'Diet'), ('energy', 'Energy')])

    def __str__(self):
        return self.name

#TravelActivity model: to store detailed information specific to travel 
class TravelActivity(models.Model):
    activity = models.OneToOneField(Activity, on_delete=models.CASCADE, related_name='travel')
    distance_km = models.FloatField()
    mode_of_transport = models.CharField(max_length=50, choices=[('car', 'Car'), ('bus', 'Bus'), ('bike', 'Bike'), ('walk', 'Walk')])
    duration_hours = models.FloatField()

    def __str__(self):
        return f"{self.activity.name} - Travel"


#DietActivity Model: to store detailed information specific to diet
class DietActivity(models.Model):
    activity= models.OneToOneField(Activity, on_delete=models.CASCADE, related_name='diet')
    food_items = models.TextField()
    calories_consumed = models.FloatField()

    def __str__(self):
        return f"{self.activity.name} - Diet"

#EnergyActivity Model: to store information about energy usage
class EnergyActivity(models.Model):
    activity= models.OneToOneField(Activity, on_delete=models.CASCADE, related_name='energy')
    electricity_usage_kwh = models.FloatField()
    appliances_used = models.TextField()

    def __str__(self):
        return f"{self.activity.name} - Energy"

#ImpactPrediction Model: to store environmental impact predictions
class ImpactPrediction(models.Model):
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE, related_name='predictions')
    predicted_carbon_footprint = models.FloatField()
    predicted_energy_usage = models.FloatField()
    prediction_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Prediction for {self.activity.name} on {self.prediction_date}"

#Suggestion Model: to store suggestions for reducing user's carbon footprint
class Suggestion(models.Model):
    activity_type = models.CharField(max_length=50, choices=[('travel', 'Travel'), ('diet', 'Diet'), ('energy', 'Energy')])
    suggestion_text = models.TextField()
    impact_reduction_estimate = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
   
    def __str__(self):
        return f"Suggestion for {self.activity_type}"

### Should show a chart/graph of user's carbon footprint overtime (a week, a month, 6 months, a year) to measure improvement (or not)