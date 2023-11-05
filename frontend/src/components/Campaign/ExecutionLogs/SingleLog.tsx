import React from "react";
import dayjs from "dayjs";

import { makeStyles } from "@mui/styles";
import { IExecutionLogByStatusAPI } from "../../../services/Api/Campaign";

const useStyles = makeStyles({
  log: {
    display: "flex",
    gap: "1em",
    flexWrap: "wrap",
    fontWeight: "bold",
    alignItems: "center",
  },
  email: {
    fontSize: "1rem",
  },
  date: {
    fontSize: "0.9rem",
    opacity: 0.9,
  },
});

interface ISingleLogProps {
  log: IExecutionLogByStatusAPI;
}

const SingleLog: React.FC<ISingleLogProps> = ({ log }) => {
  const classes = useStyles();
  const { email, created } = log || {};

  return (
    <div className={classes.log}>
      {email && <div className={classes.email}>{log.email}</div>}
      {created && (
        <div className={classes.date}>
          {dayjs(created).format("DD-MMM-YYYY HH:mm a")}
        </div>
      )}
    </div>
  );
};

export default SingleLog;
