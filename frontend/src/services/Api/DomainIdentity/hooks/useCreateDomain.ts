import { useMutation, useQueryClient } from "react-query";
import { DomainIdentityService } from "../DomainIdentity";
import { IDomainCreateAPIResponse } from "../types";

export function useCreateDomain(callback?: Function) {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(DomainIdentityService.addDomain, {
    onSuccess: (response: IDomainCreateAPIResponse) => {
      if (response.data.id) {
        callback && callback();
        queryClient.invalidateQueries("domainList");
      }
    },
  });

  return { mutate, isLoading };
}
