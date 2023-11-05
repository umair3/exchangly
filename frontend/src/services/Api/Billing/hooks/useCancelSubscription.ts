import { useMutation } from "react-query";
import { useBillingActions } from "../../../../features/billing";
import { BillingService } from "../Billing";

export function useCancelSubscription(cb?: () => void) {
  const { getCurrentSubscription } = useBillingActions();
  return useMutation((id: number) => BillingService.cancelSubscription(id), {
    onSuccess: async () => {
      cb && cb();
      await getCurrentSubscription({});
    },
  });
}
