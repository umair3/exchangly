import { useCallback } from "react";
import { useAppSelector } from "../../../app/hooks";
import { useAudienceActions } from "../../../features/audience";
import { ILabelValue } from "../../Common/CustomSelect";

export function useTagFilter() {
  const tags = useAppSelector((state) => state.audience.root.filterByTags);
  const { setTagFilter } = useAudienceActions();

  const changeTagFilter = useCallback((tagValue: ILabelValue[]) => {
    setTagFilter(tagValue);
  }, []);

  return { tags, changeTagFilter };
}
