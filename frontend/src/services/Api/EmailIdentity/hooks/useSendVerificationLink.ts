import { useMutation } from "react-query";
import { EmailIdentityService } from "../EmailIdentity";

export function useSendVerificationLink(cb?: () => void) {
  const { mutate, isLoading } = useMutation(
    EmailIdentityService.sendVerificationLink,
    {
      onSuccess: (_response) => {
        cb && cb();
      },
    }
  );

  return { mutate, isLoading };
}
