from django.contrib import admin
from .models import Activity, TravelActivity, DietActivity, EnergyActivity, ImpactPrediction, Suggestion

# Register your models here.
admin.site.register(Activity)
admin.site.register(TravelActivity)
admin.site.register(DietActivity)
admin.site.register(EnergyActivity)
admin.site.register(ImpactPrediction)
admin.site.register(Suggestion)
