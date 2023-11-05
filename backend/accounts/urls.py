from django.urls import include, path
# from rest_framework import routers
from .views import AccountViewSet, signup_view, login_view, forgot_password_view, reset_password_view, ProfileViewSet, verify_view

# urlpatterns = []
# router = routers.DefaultRouter()
# router.register('signup', SignupView, 'signup')
# urlpatterns = router.urls

account_create = AccountViewSet.as_view({'post': 'create'})
profile = ProfileViewSet.as_view({'get': 'profile'})
urlpatterns = [
    # path('players/<pk>/<year>', player_monthly_scores),
    # path('player/<pk>/', player_detail),
    path('api/signup', account_create),
    path('profile/', profile),
    path('signup', signup_view),
    path('login', login_view, name='login'),
    path('forgot-password', forgot_password_view),
    path('reset-password', reset_password_view),
    path('verify', verify_view)
]