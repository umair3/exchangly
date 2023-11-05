import { useAppSelector } from "../../../../app/hooks";
import { usePlanById } from "../../../../services/Api/Billing";

export function usePlanDetail() {
  const subscriptions = useAppSelector((state) => state.billing.subscriptions);

  const activePlan = subscriptions.find(
    (subscription) => subscription.access_type === "PLAN"
  );

  const { planDetail } = usePlanById(activePlan!.plan);
  return { planDetail };
}
