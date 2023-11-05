import { useState } from "react";
import { useQuery } from "react-query";

import { BillingService } from "../Billing";
import { IPricingPlanAPI, IPricingPlansResponseAPI } from "../types";

export function usePricingPlans() {
  const [plans, setPlans] = useState<IPricingPlanAPI[]>([]);

  const { isLoading } = useQuery(
    "pricingPlans",
    BillingService.getPricingPlans,
    {
      refetchOnWindowFocus: false,
      onSuccess: (response: IPricingPlansResponseAPI) => {
        if (response.data) {
          setPlans(response.data);
        }
      },
    }
  );
  return { isLoading, plans };
}
