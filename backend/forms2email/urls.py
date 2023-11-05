from django.urls import path
from rest_framework import routers
from .views import Forms2EmailViewSet, SubmitFormAPI

router = routers.SimpleRouter()
router.register('forms2email', Forms2EmailViewSet, 'forms2email')
urlpatterns = router.urls

# submit_form = SubmitFormAPI().as_view()
submit_form = SubmitFormAPI
urlpatterns.append(path('submit-form', submit_form))
# urlpatterns.append(path('submit-form', AudienceStatsView.as_view(), name='audience_stats'))
