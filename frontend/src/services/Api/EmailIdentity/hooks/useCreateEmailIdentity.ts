import { useMutation } from "react-query";
import { ShowAlert } from "../../../../features/alert";
import { useNavigation } from "../../../../hooks";
import { paths } from "../../../AppRoutes/paths";
import { EmailIdentityService } from "../EmailIdentity";

export function useCreateEmailIdentity() {
  const { goToPath } = useNavigation();

  const { mutate, isLoading } = useMutation(
    EmailIdentityService.createIdentity,
    {
      onSuccess: (response) => {
        if (response?.data?.email) {
          const { email } = response.data;

          goToPath(paths.emailsIdentity);
          ShowAlert({
            message: `${email} is added successfully`,
            status: "success",
          });
        }
      },
    }
  );

  return { mutate, isLoading };
}
