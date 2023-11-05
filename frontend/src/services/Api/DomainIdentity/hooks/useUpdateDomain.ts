import { useMutation, useQueryClient } from "react-query";
import { DomainIdentityService } from "../DomainIdentity";
import { IDomainUpdateAPIResponse } from "../types";

export function useUpdateDomain(callback?: Function) {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    DomainIdentityService.updateDomain,
    {
      onSuccess: (response: IDomainUpdateAPIResponse) => {
        if (response.data.id) {
          callback && callback();
          queryClient.invalidateQueries("domainList");
        }
      },
    }
  );

  return { mutate, isLoading };
}
