import { useCallback, useEffect, useMemo, useState } from "react";

import { useAppSelector } from "../../../../app/hooks";
import { useAudienceActions } from "../../../../features/audience";
import { useReactMultiSelect } from "../../../../hooks";

export function useTagFunctionality() {
  const { setTag, setPopularTag } = useAudienceActions();
  const { selectedTags } = useAppSelector(
    (state) => state.audience.importAudience.tag
  );

  const { selectedOptions, onSelectChange, changeSelectedOptionsTo } =
    useReactMultiSelect();

  const transFormToOptions = useCallback((options: string[]) => {
    return options.map((option) => ({ label: option, value: option }));
  }, []);

  useEffect(() => {
    changeSelectedOptionsTo(transFormToOptions(selectedTags));
  }, [selectedTags]);

  const simpleTags = useMemo(() => {
    return selectedOptions.map(({ label }) => label);
  }, [selectedOptions]);

  const updateStatusTags = useCallback(() => {
    setTag({ selectedTags: simpleTags });
  }, [simpleTags]);

  const tagExists = (tag: string) =>
    selectedOptions.some(({ value }) => value === tag);

  const onTagSelect = useCallback(
    (tag: string) => {
      if (!tagExists(tag)) {
        updateStatusTags();

        setPopularTag(tag);
      }
    },
    [updateStatusTags]
  );

  return { onSelectChange, selectedOptions, updateStatusTags, onTagSelect };
}
