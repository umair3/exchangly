import React, { useMemo } from "react";
import Select, { ActionMeta, MultiValue } from "react-select";
import { useReactMultiSelect, useReactSelectStyles } from "../../hooks";
import { useFetchTags } from "../../services/Api/Audience/hooks";

import { ILabelValue } from "../Common/CustomSelect";
import { useTagFilter } from "./hooks";

interface ITagFilterProps {
  resetPagination: () => void;
}

const TagFilter: React.FC<ITagFilterProps> = ({ resetPagination }) => {
  const { tags } = useFetchTags();
  const styles = useReactSelectStyles<ILabelValue>();

  const { tags: filterTags, changeTagFilter } = useTagFilter();

  const { inputValue, onInputChange } = useReactMultiSelect();

  const onChangeTagFilter = (
    value: MultiValue<ILabelValue>,
    _actionMeta: ActionMeta<ILabelValue>
  ) => {
    resetPagination();
    changeTagFilter([...value]);
  };

  const tagsWithLabel = useMemo(() => {
    return tags.map((tag) => ({ label: tag.title, value: tag.id.toString() }));
  }, [tags]);

  return (
    <div className="w-full md:max-w-sm">
      <Select
        isMulti
        name="tags"
        options={tagsWithLabel}
        styles={styles}
        placeholder="Choose tags to apply filter"
        inputValue={inputValue}
        onInputChange={onInputChange}
        value={filterTags}
        onChange={onChangeTagFilter}
      />
    </div>
  );
};

export default TagFilter;
