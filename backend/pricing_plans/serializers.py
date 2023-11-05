from rest_framework import serializers
from .models import PricingPlan, Addon


class PricingPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = PricingPlan
        fields = '__all__'

    # id = serializers.IntegerField(read_only=True)
    # title = serializers.CharField(required=True, allow_blank=False, max_length=500)
    # type = serializers.CharField(required=True, allow_blank=False, max_length=20)

    def to_representation(self, instance: PricingPlan):
        response = super().to_representation(instance)
        items = Addon.objects.filter(parent=instance.pk)
        addons_serialized = []
        for item in items:
            # addons_serialized.append(AddonSerializer(item).data)
            addons_serialized.append(PricingPlanSerializer(item.pricing).data)
        addons_serialized_dict = {}
        for x in addons_serialized:
            addons_serialized_dict[x['order']] = x
        addons_serialized_sorted = []
        for i in sorted(addons_serialized_dict.keys()):
            addons_serialized_sorted.append(addons_serialized_dict[i])
        response['addons'] = addons_serialized_sorted
        return response


class AddonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Addon
        fields = '__all__'


#
# class CampaignExecutionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CampaignExecution
#         fields = '__all__'
#         # fields = ['id', 'campaign', 'status']
#         # exclude = ('user',)
#     user = serializers.HiddenField(default=CurrentUserDefault())
#
#     def to_representation(self, instance):
#         response = super().to_representation(instance)
#         response['addons'] = CampaignSerializer(instance.campaign).data
#         return response

    
