import maxminddb


class GeoIP:
    @staticmethod
    def ip_to_country(ip: str):
        country = 'US'
        with maxminddb.open_database('GeoLite2-City.mmdb') as reader:
            # reader.get('152.216.7.110')
            # ip = '221.132.118.76'
            result = reader.get(ip)
            if result:
                country = result['country']['iso_code']
        if country is None or country == '':
            country = 'US'
        return country

    @staticmethod
    def get_client_ip(request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
            print(f"x_forwarded_for: {ip}")
        else:
            ip = request.META.get('REMOTE_ADDR')
            print(f"REMOTE_ADDR: {ip}")
        return ip
