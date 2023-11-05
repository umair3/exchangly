import { useMutation, useQueryClient } from "react-query";

import { AudienceService } from "../Audience";

export function useDeleteContact(cb?: () => void) {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(AudienceService.deleteContact, {
    onSuccess: (_response) => {
      queryClient.invalidateQueries("audienceList");
      cb && cb();
    },
  });

  return { mutate, isLoading };
}
