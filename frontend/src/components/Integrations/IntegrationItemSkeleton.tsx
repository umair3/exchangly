import React from "react";
import { makeStyles } from "@mui/styles";
import { Skeleton } from "@mui/material";

const useStyles = makeStyles({
  container: {
    width: "100%",
    height: "100%",
    padding: "2em",
    border: "1px solid var(--light20)",
    boxShadow: "1px 0 20px var(--light20)",
    borderRadius: "1em",
  },
});

interface IIntegrationItemSkeletonProps {}

const IntegrationItemSkeleton: React.FC<IIntegrationItemSkeletonProps> = (
  props
) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Skeleton width="30%" />
      <Skeleton width="40%" />
      <Skeleton width="40%" />
      <Skeleton width="50%" />
      <Skeleton width="100%" />
      <Skeleton width="100%" />
    </div>
  );
};

export default IntegrationItemSkeleton;
