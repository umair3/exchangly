import { useMutation, useQueryClient } from "react-query";
import { ShowAlert } from "../../../../features/alert";
import { IntegrationService } from "../Integrations";
import { IEditIntegrationResponseAPI } from "../types";

export function useEditIntegration(cb: Function) {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    IntegrationService.editIntegration,
    {
      onSuccess: (response) => {
        const { data } = response as IEditIntegrationResponseAPI;
        if (data && "title" in data) {
          ShowAlert({
            message: `Integration ${data.title} is updated successfully`,
            status: "success",
          });

          cb();
          queryClient.invalidateQueries("integrationList");
        }
      },
    }
  );

  return { editIntegration: mutate, isLoading };
}
