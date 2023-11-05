import { useCallback } from "react";
import { useAppSelector } from "../../../app/hooks";
import { useAudienceActions } from "../../../features/audience";
import { ILabelValue } from "../../Common/CustomSelect";

export function useStatusFilter() {
  const status = useAppSelector((state) => state.audience.root.filterByStatus);
  const { setStatusFilter } = useAudienceActions();

  const changeStatusFilter = useCallback((statusValue: typeof status) => {
    setStatusFilter(statusValue);
  }, []);

  return { status, changeStatusFilter };
}
