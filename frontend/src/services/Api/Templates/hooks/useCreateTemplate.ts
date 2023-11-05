import { useMutation, useQueryClient } from "react-query";
import { ShowAlert } from "../../../../features/alert";
import { useNavigation } from "../../../../hooks";
import { paths } from "../../../AppRoutes/paths";
import { TemplatesService } from "../Templates";

export function useCreateTemplate(cb?: Function) {
  const queryClient = useQueryClient();
  const { goToPath } = useNavigation();

  const { mutate, isLoading } = useMutation(TemplatesService.addTemplate, {
    onSuccess: (response) => {
      if (response.data && response.data?.id) {
        queryClient.invalidateQueries("userTemplates");
        goToPath(paths.templates);
        ShowAlert({
          message: "Template is created successfully",
          status: "success",
        });
      }
    },
  });

  return { createTemplate: mutate, isLoading };
}
