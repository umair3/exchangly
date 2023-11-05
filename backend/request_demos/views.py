from rest_framework import viewsets
from .models import RequestDemo
from .serializers import RequestDemoSerializer

class RequestDemoViewset(viewsets.ModelViewSet):
    #queryset = Pricingplan.objects.all().order_by('title')
    serializer_class = RequestDemoSerializer

    def get_queryset(self):
        # plantype = self.request.plantype
        # return Pricingplan.objects.filter(plantype=plantype)
        queryset = RequestDemo.objects.all()
        # plantype = self.request.query_params.get('plantype', None)
        # if plantype is not None:
        #     queryset = queryset.filter(plantype=plantype)
        return queryset
