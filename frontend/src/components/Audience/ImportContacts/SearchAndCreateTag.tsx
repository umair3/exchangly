import { makeStyles } from "@mui/styles";
import React from "react";
import { ActionMeta, MultiValue, OnChangeValue } from "react-select";
import AsyncCreatableSelect from "react-select/async-creatable";

import {
  useReactMultiSelect,
  ILabelValue,
  useReactSelectStyles,
} from "../../../hooks";
import {
  useFetchTags,
  useSearchTags,
} from "../../../services/Api/Audience/hooks";

const useStyles = makeStyles({
  selectContainer: {
    margin: "15px 0",
  },
  description: {
    color: "var(--dark)",
    opacity: 0.7,
    fontSize: "0.8rem",
  },
});

interface ISearchAndCreateTagProps {
  onSelectChange: (
    value: OnChangeValue<ILabelValue, true>,
    actionMeta: ActionMeta<ILabelValue>
  ) => void;

  value: MultiValue<ILabelValue>;
}

const SearchAndCreateTag: React.FC<ISearchAndCreateTagProps> = ({
  onSelectChange,
  value,
}) => {
  const classes = useStyles();
  const fetchTags = useSearchTags();
  const styles = useReactSelectStyles<ILabelValue>();
  const { tags: defaultTags } = useFetchTags();

  const { inputValue, onInputChange } = useReactMultiSelect();

  return (
    <React.Fragment>
      <h4>Search for or create tags</h4>
      <div className={classes.selectContainer}>
        <AsyncCreatableSelect
          isClearable
          isMulti
          styles={styles}
          loadOptions={fetchTags}
          closeMenuOnSelect={false}
          blurInputOnSelect={false}
          cacheOptions
          placeholder="Search"
          inputValue={inputValue}
          onInputChange={onInputChange}
          onChange={onSelectChange}
          value={value}
          defaultOptions={defaultTags.map((tag) => ({
            label: tag.title,
            value: tag.title,
          }))}
        />
      </div>
      <h4 className={classes.description}>Start typing to add a custom tag</h4>
    </React.Fragment>
  );
};

export default SearchAndCreateTag;
