import { useLoading } from "../../../../hooks";
import { CallAPI, ICallbacks } from "../../../../utils/CallAPI";
import { BillingService } from "../Billing";

export function useCreatePayment<T>(props: ICallbacks<T>) {
  const [isLoading, setLoading] = useLoading(false);

  const createPayment = (orderId: number) => {
    setLoading(true);
    CallAPI<T>({
      call: () => BillingService.createPayment(orderId),
      onSuccess: props.onSuccess,
      onError: props.onError,
      onFinally: () => setLoading(false),
    });
  };

  return {
    isLoading,
    createPayment,
  };
}
