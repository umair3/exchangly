import { useState } from "react";
import { useQuery } from "react-query";
import { BillingService } from "../Billing";
import { IPaymentsAPI, IPaymentsResponseAPI } from "../types";

interface IUsePaymentsParams {
  currentPage: number;
  callback?: (data: IPaymentsResponseAPI) => void;
}

export function usePayments({ currentPage, callback }: IUsePaymentsParams) {
  const [payments, setPayments] = useState<IPaymentsAPI[]>([]);

  const { isLoading, isFetching } = useQuery(
    ["payments", currentPage],
    () => BillingService.getPayments(currentPage),
    {
      refetchOnWindowFocus: false,
      onSuccess: (response: IPaymentsResponseAPI) => {
        setPayments(response?.data?.results || []);
        callback && callback(response);
      },
    }
  );

  return { isLoading, isFetching, payments };
}
