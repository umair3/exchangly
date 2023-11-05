import React from "react";
import { motion } from "framer-motion";

const opacityTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

interface IOpacityTransitionProps {
  [x: string]: any;
}

const OpacityTransition: React.FC<IOpacityTransitionProps> = ({
  children,
  ...rest
}) => {
  return (
    <motion.div
      variants={opacityTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full"
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default OpacityTransition;
