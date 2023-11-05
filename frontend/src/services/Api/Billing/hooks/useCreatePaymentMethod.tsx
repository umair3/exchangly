import { PaymentIntentResult } from "@stripe/stripe-js";
import { callbackify } from "util";
import { usePaymentProcessing } from "../../../../components/Stripe/hooks/usePaymentProcessing";
import { ShowAlert } from "../../../../features/alert";
import { useLoading } from "../../../../hooks";
import { CallAPI } from "../../../../utils/CallAPI";
import { BillingService } from "../Billing";
import { ICreatePaymentMethodAPI } from "../types";

export function useCreatePaymentMethod() {
  const [isLoading, setLoading] = useLoading(false);
  const { processPayment } = usePaymentProcessing();

  const createPaymentMethod = (callback?: () => void) => {
    setLoading(true);
    CallAPI<{ data: ICreatePaymentMethodAPI }>({
      call: BillingService.createPaymentMethod,
      onSuccess: async (response) => {
        if (response.data.clientSecret) {
          await stripeAPICall(response.data.clientSecret, callback);
        }
      },
      onError: (error) => {
        setLoading(false);
        ShowAlert({
          status: "error",
          message: (error as any)?.message || "Something is went wrong",
        });
      },
    });
  };

  const stripeAPICall = async (clientSecret: string, cb?: () => void) => {
    const result = await processPayment(clientSecret);
    setLoading(false);
    if (!result) {
      ShowAlert({
        status: "error",
        message: "Something is went wrong",
      });
      return;
    }

    const { error, paymentIntent } = result as PaymentIntentResult;

    if (error) {
      ShowAlert({
        status: "error",
        message: `Payment Failed ${error.message}`,
      });
    } else if (paymentIntent) {
      ShowAlert({
        status: "success",
        message: "Your card will show after verification from the bank",
      });
      cb && cb();
    }
  };

  return {
    isLoading,
    createPaymentMethod,
  };
}
