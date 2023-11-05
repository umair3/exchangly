from rest_framework import routers
from .views import CouponViewSet

router = routers.DefaultRouter()
router.register('coupons', CouponViewSet, 'coupon')

urlpatterns = router.urls
