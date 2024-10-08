# impact_forecasterWeb/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from forecasts.views import ActivityViewSet, TravelActivityViewSet, DietActivityViewSet, EnergyActivityViewSet, ImpactPredictionViewSet, SuggestionViewSet

router = DefaultRouter()
router.register(r'activities', ActivityViewSet)
router.register(r'travel-activities', TravelActivityViewSet)
router.register(r'diet-activities', DietActivityViewSet)
router.register(r'energy-activities', EnergyActivityViewSet)
router.register(r'impact-predictions', ImpactPredictionViewSet)
router.register(r'suggestions', SuggestionViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]