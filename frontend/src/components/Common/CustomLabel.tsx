import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
  label: {
    fontWeight: 600,
    fontSize: "1rem",
    height: "32px",
    margin: "10px 0",
    lineHeight: "24px",
    wordSpacing: "1px",
  },
});

export interface ICustomLabelProps {
  children: React.ReactNode;
  id?: string;
}

const CustomLabel: React.FunctionComponent<ICustomLabelProps> = ({
  children,
  id,
}) => {
  const classes = useStyles();

  return (
    <label htmlFor={id} className={classes.label}>
      {children}
    </label>
  );
};

export default CustomLabel;
