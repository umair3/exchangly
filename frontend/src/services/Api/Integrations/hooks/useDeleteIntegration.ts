import { useMutation, useQueryClient } from "react-query";
import { ShowAlert } from "../../../../features/alert";
import { IntegrationService } from "../Integrations";

export function useDeleteIntegration(cb: Function, title: string) {
  const queryClient = useQueryClient();

  const { mutate: deleteIntegration, isLoading } = useMutation(
    IntegrationService.deleteIntegration,
    {
      onSuccess: (_response) => {
        ShowAlert({
          message: `${title} is deleted successfully`,
          status: "success",
        });
        cb();
        queryClient.invalidateQueries("integrationList");
      },
    }
  );

  return { deleteIntegration, isLoading };
}
