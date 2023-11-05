import { makeStyles } from "@mui/styles";
import React from "react";

import { CustomLabel, CustomSelect } from ".";
import { ICustomSelectProps } from "./CustomSelect";

const useStyles = makeStyles({
  inputWithLabel: {
    width: "100%",
  },
});

interface ICustomLabelWithSelectProps extends ICustomSelectProps {
  label: string;
}

const CustomLabelWithSelect: React.FC<ICustomLabelWithSelectProps> = ({
  label,
  value,
  options,
  optionsWithLabels,
  onChange,
  defaultLabelWithValue,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.inputWithLabel}>
      <div style={{ marginLeft: "5px" }}>
        <CustomLabel>{label}</CustomLabel>
      </div>
      <CustomSelect
        value={value}
        options={options}
        optionsWithLabels={optionsWithLabels}
        onChange={onChange}
        defaultLabelWithValue={defaultLabelWithValue}
      />
    </div>
  );
};

export default CustomLabelWithSelect;
