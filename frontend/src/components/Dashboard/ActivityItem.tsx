import { makeStyles } from "@mui/styles";
import React from "react";
import dayjs from "dayjs";
import { IActivitiesAPI } from "../../services/Api/Activity";
import { capitalize } from "../../utils";
import { OpacityTransition } from "../Common";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "0.8em",
  },
  statusDate: {
    fontSize: "0.8rem",
    opacity: 0.9,
    paddingInline: "0.2em",
  },
  heading: {
    fontWeight: "bold",
  },
});

export interface IActivityItemProps extends IActivitiesAPI {
  email: string;
}

const ActivityItem: React.FC<IActivityItemProps> = ({
  module,
  created,
  operation,
  email,
}) => {
  const classes = useStyles();

  if (!module || !created || !operation || !email) {
    return null;
  }

  return (
    <OpacityTransition className={classes.container}>
      <div className={classes.statusDate}>
        {capitalize(module)}
        <span>. {dayjs(created).format("MMMM M, YYYY")}</span>
      </div>
      <h4 className={classes.heading}>
        {email} has performed "{operation.toLowerCase()}" operation on{" "}
        {module.toLowerCase()}
      </h4>
    </OpacityTransition>
  );
};

export default ActivityItem;
