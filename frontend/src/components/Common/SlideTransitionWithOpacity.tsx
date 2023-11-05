import React from "react";
import { motion } from "framer-motion";

const SlideTransition = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100, transition: { duration: 1 } },
  transition: { type: "spring", stiffness: 50 },
};

interface ISlideTransitionWithOpacityProps {
  [x: string]: any;
}

const SlideTransitionWithOpacity: React.FC<
  ISlideTransitionWithOpacityProps
> = ({ children, ...rest }) => {
  return (
    <motion.div
      variants={SlideTransition}
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

export default SlideTransitionWithOpacity;
