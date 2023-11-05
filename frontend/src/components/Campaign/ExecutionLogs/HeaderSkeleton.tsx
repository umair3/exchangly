import React from "react";
import { makeStyles } from "@mui/styles";
import { Skeleton } from "@mui/material";

const useStyles = makeStyles({
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
    width: "100%",

    gap: "0.1em",
  },
  children: {
    minHeight: "70px",
    position: "relative",
    color: "var(--light)",

    outline: "none",
    border: "none",
  },

  header: {
    position: "absolute",

    inset: "25% 30% 5% 10%",
    zIndex: 1,
  },

  "@media screen and (max-width:1100px)": {
    container: {
      gap: "0.2em",
    },
  },
});

interface IHeaderSkeletonProps {}

const HeaderSkeleton: React.FC<IHeaderSkeletonProps> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.children}>
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height="100%"
        />

        <div className={classes.header}>
          <Skeleton animation="wave" width="100%" />
          <Skeleton animation="wave" width="50%" />
        </div>
      </div>
      <div className={classes.children}>
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height="100%"
        />
        <div className={classes.header}>
          <Skeleton animation="wave" width="100%" />
          <Skeleton animation="wave" width="50%" />
        </div>
      </div>
      <div className={classes.children}>
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height="100%"
        />
        <div className={classes.header}>
          <Skeleton animation="wave" width="100%" />
          <Skeleton animation="wave" width="50%" />
        </div>
      </div>
      <div className={classes.children}>
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height="100%"
        />
        <div className={classes.header}>
          <Skeleton animation="wave" width="100%" />
          <Skeleton animation="wave" width="50%" />
        </div>
      </div>
    </div>
  );
};

export default HeaderSkeleton;
