import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
  tagcContainer: {
    display: "flex",
    alignItems: "center",
    gap: "0.5em",
    flexWrap: "wrap",
    fontSize: "0.9rem",
  },
  audience: {
    marginLeft: "auto",
    fontWeight: "bold",
  },
});

export interface ISingleTagProps {
  name: string;
  count: number;
}

const SingleTag: React.FC<ISingleTagProps> = ({ name, count }) => {
  const classes = useStyles();
  return (
    <div className={classes.tagcContainer}>
      <div>{name}</div>
      <div className={classes.audience}>{count}</div>
    </div>
  );
};

export default SingleTag;
