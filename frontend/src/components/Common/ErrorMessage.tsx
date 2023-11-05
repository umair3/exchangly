import { makeStyles } from "@mui/styles";
import React from "react";
import { RiErrorWarningLine } from "react-icons/ri";

const useStyles = makeStyles({
  messsage: {
    fontSize: "0.9rem",
    color: "var(--light)",
    marginBlock: "0.1em",
    padding: "0.3em 1em",
    textAlign: "left",
    width: "100%",
    backgroundColor: "var(--primary)",
    borderRadius: "1em",
    opacity: 0.8,
    display: "flex",
    alignItems: "center",
    gap: "0.3em",
  },
});

interface IErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<IErrorMessageProps> = ({ message }) => {
  const classes = useStyles();

  return (
    <div className={classes.messsage}>
      <RiErrorWarningLine />

      <div>{message}</div>
    </div>
  );
};

export default ErrorMessage;
