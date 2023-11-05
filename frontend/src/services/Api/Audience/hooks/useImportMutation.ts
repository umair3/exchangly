import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../app/hooks";
import { ShowAlert } from "../../../../features/alert";
import { resetImportContactsState } from "../../../../features/audience";

import { paths } from "../../../../services/AppRoutes/paths";
import { AudienceService } from "../Audience";
import { IAudienceBulkImportResponseAPI } from "../types";

export function useImportMutation() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(AudienceService.bulkImport, {
    onSuccess: (response: IAudienceBulkImportResponseAPI) => {
      if (response.data && response.data.message) {
        ShowAlert({
          message: response.data.message,
          status: "success",
        });
        dispatch(resetImportContactsState());
        queryClient.invalidateQueries("audienceList");
        navigate(paths.audience);
      }
    },
  });

  return { mutate, isLoading };
}
