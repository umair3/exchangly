import { useCallback } from "react";

import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../../../../app/hooks";

import { useAudienceActions } from "../../../../features/audience";
import { useImportMutation } from "../../../../services/Api/Audience/hooks";

import { paths } from "../../../../services/AppRoutes/paths";

export function useCompleteImportFunctionality() {
  const {
    import: ImportState,
    organize,
    tag,
  } = useAppSelector((state) => state.audience.importAudience);

  const { resetImportContactsState } = useAudienceActions();

  const navigate = useNavigate();

  const { mutate, isLoading: mutationLoading } = useImportMutation();

  const onCancel = useCallback(() => {
    resetImportContactsState();
    navigate(paths.audience);
  }, []);

  const onComplete = useCallback(() => {
    if (
      ImportState.copyPaste.length &&
      organize.status &&
      tag.selectedTags.length
    ) {
      mutate({
        emails: ImportState.copyPaste,
        status: organize.status,
        tags: tag.selectedTags,
      });
    }
  }, [ImportState, organize, tag]);

  return {
    onCancel,
    onComplete,
    mutationLoading,

    ImportState,
    organize,
    tag,
  };
}
