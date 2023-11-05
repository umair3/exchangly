import { makeStyles } from "@mui/styles";
import React from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";

import Circular from "../../assets/images/circular.svg";

const useStyles = makeStyles({
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(255, 255, 255, 0.8)",
    zIndex: 10000,
    pointerEvents: "none",
  },
  image: {
    position: "fixed",
    top: "50%",
    left: "50%",

    transform: "translate(-50%, -50%)",
  },
});
const transition = {
  in: { opacity: 0 },
  out: { opacity: 1 },
};
interface ICircularOrderProps {
  style?: React.CSSProperties;
}

const CircularLoader: React.FunctionComponent<ICircularOrderProps> = ({
  style,
}) => {
  const classes = useStyles();
  return ReactDOM.createPortal(
    <motion.div
      variants={transition}
      initial="in"
      animate="out"
      exit="in"
      className={classes.container}
      style={style}
    >
      <motion.img
        variants={transition}
        initial="in"
        animate="out"
        transition={{ delay: 0.5 }}
        src={Circular}
        alt="Loader"
        title="Loader"
        className={classes.image}
      />
    </motion.div>,
    document.getElementById("appLoader")!
  );
};

export default CircularLoader;
