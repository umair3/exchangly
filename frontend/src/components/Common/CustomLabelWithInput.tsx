import { makeStyles } from "@mui/styles";
import React from "react";

import CustomInput, { ICustomInputProps } from "./CustomInput";
import CustomLabel from "./CustomLabel";

const useStyles = makeStyles({
  inputWithLabel: {
    width: "100%",
  },
});

interface ICustomLabelWithInputProps extends ICustomInputProps {
  label: string;
}

const CustomLabelWithInput: React.FC<ICustomLabelWithInputProps> = ({
  label,
  name,
  id,
  value,
  placeholder,
  onChange,
  type,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.inputWithLabel}>
      <CustomLabel id={id}>{label}</CustomLabel>
      <CustomInput
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default CustomLabelWithInput;
