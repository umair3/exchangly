import React from "react";
import { makeStyles } from "@mui/styles";
import { Skeleton } from "@mui/material";

const useStyles = makeStyles({
  item: {
    width: "100%",

    padding: "1em",
    cursor: "pointer",
    transition: "0.2s all linear",
    border: "1px solid var(--light50)",
    boxShadow: "10px 10px 20px var(--light50)",
    borderRadius: "1em",
  },

  wrapper: {
    display: "flex",
    gap: "0.5rem",
    width: "100%",
  },
});

interface IListItemSkeletonProps {}

const ListItemSkeleton: React.FC<IListItemSkeletonProps> = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.item}>
      <div className={classes.wrapper}>
        <div>
          <Skeleton variant="circular" width={30} height={30} />
        </div>
        <div style={{ flexGrow: 1 }}>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      </div>
    </div>
  );
};

export default ListItemSkeleton;
