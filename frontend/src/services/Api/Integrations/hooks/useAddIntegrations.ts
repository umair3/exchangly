import { useMutation, useQueryClient } from "react-query";
import { ShowAlert } from "../../../../features/alert";
import { IntegrationService } from "../Integrations";
import { IAddIntegrationResponseAPI } from "../types";

export function useAddIntegration(cb: Function) {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(IntegrationService.addIntegration, {
    onSuccess: (response) => {
      const { data } = response as IAddIntegrationResponseAPI;
      if (data && "title" in data) {
        ShowAlert({
          message: `Integration ${data.title} is added successfully`,
          status: "success",
        });

        cb && cb();
        queryClient.invalidateQueries("integrationList");
      }
    },
  });

  return { addIntegration: mutate, isLoading };
}
