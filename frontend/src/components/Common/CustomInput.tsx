import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
  inputContainer: {
    width: "100%",

    margin: "5px 0",
  },
  input: {
    width: "100%",
    height: "100%",
    padding: "0.5em 1em",
    fontSize: "1rem",

    borderRadius: "2em",

    border: "1px solid var(--light20)",

    outlineColor: "var(--primary)",

    "&::placeholder": {
      color: "var(--dark)",
      opacity: 0.7,
    },
  },
});

export type InputElem = HTMLInputElement | HTMLTextAreaElement;

export interface ICustomInputProps {
  id?: string;
  name?: string;
  value?: string;
  defaultValue?: string | number | readonly string[] | undefined;
  placeholder?: string;
  rows?: number;
  type: "text" | "email" | "password" | "textarea" | "number";
  onChange?: (event: React.ChangeEvent<InputElem>) => void;
  onBlur?: (event: React.FocusEvent<InputElem>) => void;
  className?: string;
}

const CustomInput = React.forwardRef<InputElem, ICustomInputProps>(
  (
    {
      name,
      type,
      id,
      rows,
      placeholder,
      onChange,
      onBlur,
      value,
      className,
      defaultValue,
    },
    ref
  ) => {
    const classes = useStyles();

    const inputClassNames = [classes.input, className ? className : ""].join(
      " "
    );

    return (
      <div className={classes.inputContainer}>
        {type === "textarea" ? (
          <textarea
            name={name}
            id={id}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            className={inputClassNames}
            placeholder={placeholder}
            rows={rows}
            ref={ref as any}
            defaultValue={defaultValue}
          />
        ) : (
          <input
            onBlur={onBlur}
            type={type}
            name={name}
            id={id}
            value={value}
            onChange={onChange}
            className={inputClassNames}
            placeholder={placeholder}
            ref={ref as any}
            defaultValue={defaultValue}
          />
        )}
      </div>
    );
  }
);

export default CustomInput;
