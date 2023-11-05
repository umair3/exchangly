import React from "react";
import { MdUnfoldMore } from "react-icons/md";

interface ILoadMoreProps {
  loadMore: () => void;
}

const LoadMore: React.FC<ILoadMoreProps> = ({ loadMore }) => {
  return (
    <div className="w-full my-2 flex items-center justify-center">
      <button
        className="flex items-center gap-2 justify-center border border-gray-200 rounded-md py-2 px-3 hover:bg-gray-100 transition-all"
        onClick={loadMore}
      >
        Load more..
        <MdUnfoldMore />
      </button>
    </div>
  );
};

export default LoadMore;
