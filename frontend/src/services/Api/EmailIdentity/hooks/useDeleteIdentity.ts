import { useMutation, useQueryClient } from "react-query";
import { EmailIdentityService } from "../EmailIdentity";

export function useDeleteIdentity(cb?: () => void) {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    EmailIdentityService.deleteIdentity,
    {
      onSuccess: (_response) => {
        queryClient.invalidateQueries("emailIdentities");
        cb && cb();
      },
    }
  );

  return { mutate, isLoading };
}
