import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
  info: {
    margin: "5px 0",
    fontSize: "0.9rem",
    lineHeight: "24px",
    padding: "18px",
  },
});

interface IReceiptProps {
  email: string;
}

const Receipt: React.FunctionComponent<IReceiptProps> = ({ email }) => {
  const classes = useStyles();
  return (
    <div className={classes.info}>
      Your receipt will be sent to <br />
      <strong>{email}</strong>
    </div>
  );
};

export default Receipt;
