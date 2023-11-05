import { makeStyles } from "@mui/styles";
import React from "react";

import selectArrow from "../../assets/images/select-arrow.svg";

const useStyles = makeStyles({
  inputContainer: {
    width: "100%",
    margin: "5px 0",
  },
  selectInput: {
    width: "100%",
    padding: "7px 16px",
    fontSize: "1rem",
    borderColor: "var(--light20)",
    borderWidth: "medium",
    outlineColor: "var(--primary)",

    WebkitAppearance: "none",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    background: `url(${selectArrow}) no-repeat`,
    backgroundPosition: "center right 12px!important",
    webkitPaddingEnd: "200px !important",
  },
});

export interface ILabelValue {
  label: string;
  value: string;
}
export interface ICustomSelectProps {
  value?: string;
  options?: string[];
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  defaultLabelWithValue: ILabelValue;
  optionsWithLabels?: ILabelValue[];
}

const CustomSelect: React.FC<ICustomSelectProps> = ({
  value,
  options = [],
  onChange,
  defaultLabelWithValue,
  optionsWithLabels,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.inputContainer}>
      <select
        className={`${classes.selectInput} rounded-md`}
        value={value}
        onChange={onChange}
      >
        <option value={defaultLabelWithValue.value}>
          {defaultLabelWithValue.label}
        </option>
        {optionsWithLabels
          ? optionsWithLabels.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))
          : options.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
      </select>
    </div>
  );
};

export default CustomSelect;
