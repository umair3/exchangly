import { useMutation, useQueryClient } from "react-query";

import { AudienceService } from "../Audience";

export function useEditContact(cb?: () => void) {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(AudienceService.editContact, {
    onSuccess: (_response) => {
      queryClient.invalidateQueries("audienceList");
      cb && cb();
    },
  });

  return { mutate, isLoading };
}
