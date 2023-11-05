import React from "react";
import { motion } from "framer-motion";
import Circular from "../../assets/images/circular.svg";

interface ISimpleLoaderProps {
  classNames?: string;
}

const SimpleLoader: React.FC<ISimpleLoaderProps> = ({ classNames }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      className={`py-4 md:px-4 flex justify-center w-full overflow-hidden text-center ${classNames}`}
    >
      <img src={Circular} alt="Loader" title="Loader" />
    </motion.div>
  );
};

export default SimpleLoader;
