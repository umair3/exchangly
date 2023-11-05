import { useState } from "react";
import { useQuery } from "react-query";
import { BillingService } from "../Billing";
import { IChargeOptionAPI, IChargeOptionResponseAPI } from "../types";

export function useChargeOption(planId: number) {
  const [chargeOption, setChargeOption] = useState<IChargeOptionAPI | null>(
    null
  );

  const { isLoading } = useQuery(
    ["ChargeOptionID", planId],
    () => BillingService.getChargeOptionById(planId),
    {
      refetchOnWindowFocus: false,
      onSuccess: (response: IChargeOptionResponseAPI) => {
        setChargeOption(response.data[0]);
      },
    }
  );

  return { isLoading, chargeOption };
}
