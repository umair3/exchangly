import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import React from "react";

interface ICustomLabelWithCheckboxProps {
  id?: string;
  value?: string;
  label: string;
  name?: string;
  labelPlacement?: "top" | "start" | "bottom" | "end";
  allowDisable?: boolean;
  checked?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
}

const CustomLabelWithCheckbox: React.FC<ICustomLabelWithCheckboxProps> = ({
  id,
  label,
  labelPlacement = "end",
  allowDisable = false,
  checked,
  onChange,
  value,
  name,
}) => {
  return (
    <FormControlLabel
      value="top"
      control={
        <Checkbox
          id={id}
          name={name}
          disabled={allowDisable}
          onChange={onChange}
          checked={checked}
          value={value}
          sx={{
            color: "var(--primary)",
            opacity: allowDisable ? "0.3" : "1",
            "&.Mui-checked": {
              color: "var(--primary)",
            },
            "& + .MuiFormControlLabel-label": {
              fontWeight: "bold",
            },
          }}
        />
      }
      label={label}
      labelPlacement={labelPlacement}
    />
  );
};

export default CustomLabelWithCheckbox;
