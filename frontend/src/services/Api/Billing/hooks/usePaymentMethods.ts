import { useState } from "react";
import { useQuery } from "react-query";
import { BillingService } from "../Billing";
import { IPaymentMethodsAPI, IPaymentMethodsResponseAPI } from "../types";

export function usePaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState<IPaymentMethodsAPI[]>(
    []
  );

  const { isLoading, isFetching } = useQuery(
    ["paymentMethods"],
    BillingService.getPaymentMethods,
    {
      refetchOnWindowFocus: false,
      onSuccess: (response: IPaymentMethodsResponseAPI) => {
        setPaymentMethods(response?.data?.results || []);
      },
    }
  );

  return { isLoading, isFetching, paymentMethods };
}
