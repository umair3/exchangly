import React from "react";
import { motion } from "framer-motion";

interface IPageTransitionsProps {}

const animations = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

const PageTransitions: React.FC<IPageTransitionsProps> = ({ children }) => {
  return (
    <motion.div
      className="w-full"
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransitions;