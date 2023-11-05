import LinearProgress from "@mui/material/LinearProgress";
import { makeStyles } from "@mui/styles";
import React from "react";
import { motion } from "framer-motion";

const useStyles = makeStyles({
  outerContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 500,
    background: "rgba(255, 255, 255, 0.8)",
    pointerEvents: "none",
  },

  linearProgressRoot: {
    backgroundColor: "var(--secondary50)!important",

    height: "5px!important",
  },
  bar1: {
    backgroundColor: "var(--primary)!important",
  },
  bar2: {
    backgroundColor: "var(--secondary)!important",
  },
});

interface ILinearOrderProps {
  style?: React.CSSProperties;
}

const LinearLoader: React.FunctionComponent<ILinearOrderProps> = ({
  style,
}) => {
  const classes = useStyles();
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }}
      className={classes.outerContainer}
      style={style}
    >
      <LinearProgress
        classes={{
          root: classes.linearProgressRoot,
          bar1Indeterminate: classes.bar1,
          bar2Indeterminate: classes.bar2,
        }}
      />
    </motion.div>
  );
};

export default LinearLoader;
