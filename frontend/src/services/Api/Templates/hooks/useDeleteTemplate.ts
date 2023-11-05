import { useMutation, useQueryClient } from "react-query";
import { ShowAlert } from "../../../../features/alert";
import { useNavigation } from "../../../../hooks";
import { paths } from "../../../AppRoutes/paths";
import { TemplatesService } from "../Templates";

export function useDeleteTemplate(cb?: Function) {
  const queryClient = useQueryClient();
  const { goToPath } = useNavigation();

  const { mutate, isLoading } = useMutation(TemplatesService.deleteTemplate, {
    onSuccess: (response) => {
      queryClient.invalidateQueries("userTemplates");
      goToPath(paths.templates);
      ShowAlert({
        message: "Template is deleted successfully",
        status: "success",
      });
    },
  });

  return { deleteTemplate: mutate, isLoading };
}
