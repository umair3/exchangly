from rest_framework import viewsets, permissions
from .models import ChargeOption
from .serializers import ChargeOptionSerializer
from outers.geoIP import GeoIP


class ChargeOptionViewSet(viewsets.ModelViewSet):
    # queryset = Pricingplan.objects.all().order_by('title')
    serializer_class = ChargeOptionSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = None

    def get_queryset(self):
        # plantype = self.request.plantype
        # return Pricingplan.objects.filter(plantype=plantype)
        queryset = ChargeOption.objects.all()
        pricingplanId = self.request.query_params.get('pricingplanId', None)
        if pricingplanId is not None:
            queryset = queryset.filter(pricing_plan__id=pricingplanId)
        ip = self.request.query_params.get('ip', None)
        # ip = GeoIP.get_client_ip(request=self.request)
        country = 'US'
        if ip is not None:
            print(f"IP: {ip}")
            ip_country = GeoIP.ip_to_country(ip)
            print(f"IP Country: {ip_country}")
            if ip_country is not None:
                queryset_ip_country = queryset.filter(country=ip_country)
                if len(queryset_ip_country) > 0:
                    country = ip_country
        print(f"Final Country: {country}")
        queryset = queryset.filter(country=country)
        return queryset
