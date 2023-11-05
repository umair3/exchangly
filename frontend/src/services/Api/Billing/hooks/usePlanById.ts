import { useState } from "react";
import { useQuery } from "react-query";
import { BillingService } from "../Billing";
import { ISinglePricingPlanByIdAPI } from "../types";

interface IPlanDetailFields {
  title: string;
  contacts: number | undefined;
}

export function usePlanById(plan: number) {
  const [planDetail, setPlanDetail] = useState<IPlanDetailFields>({
    title: "",
    contacts: undefined,
  });

  const { isLoading, data } = useQuery(
    ["PlanById", plan],
    () => BillingService.getPlanById(plan),
    {
      enabled: !!plan,
      retry: false,
      refetchOnWindowFocus: false,
      onSuccess: ({ data }: ISinglePricingPlanByIdAPI) => {
        if (data) {
          setPlanDetail({
            title: data.title,
            contacts: data?.ui_json?.contacts,
          });
        }
      },
    }
  );

  return { planDetail, plan: data, isLoading };
}
