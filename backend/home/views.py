from django.shortcuts import render
from charge_options.models import ChargeOption
from pricing_plans.models import PricingPlan
import ast
import json


def index(request):
    print(f"index({request})")
    pricing_plans: [PricingPlan] = PricingPlan.objects.filter(is_addon=False, status='PUBLISH').order_by('order', 'id')
    plans = []
    pricing_plan: PricingPlan
    for pricing_plan in pricing_plans:
        charge_options: [ChargeOption] = ChargeOption.objects.filter(pricing_plan=pricing_plan)
        # features = json.loads(json.dumps(pricing_plan.ui_json))
        plan = {
            'title': pricing_plan.title,
            'options': charge_options,
            'features': pricing_plan.ui_json
        }
        plans.append(plan)
    context = {
        'logged_in': request.user.is_authenticated,
        # 'user': request.user,
        # 'pricing_plans': pricing_plans,
        'plans': plans
    }
    return render(request, 'index.html', context=context)
