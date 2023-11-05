import { useMutation, useQueryClient } from "react-query";
import { ShowAlert } from "../../../../features/alert";

import { EmailIdentityService } from "../EmailIdentity";

export function useEditEmailIdentity(cb?: () => void) {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(EmailIdentityService.editIdentity, {
    onSuccess: (response) => {
      if (response?.data?.email) {
        const { email } = response.data;
        queryClient.invalidateQueries("emailIdentities");
        cb && cb();
        ShowAlert({
          message: `${email} is updated successfully`,
          status: "success",
        });
      }
    },
  });

  return { mutate, isLoading };
}
