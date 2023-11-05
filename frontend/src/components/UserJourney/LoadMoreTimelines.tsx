import React from "react";
import { MdUnfoldMore } from "react-icons/md";
import { LoadMore } from "../Common";

interface ILoadMoreTimelinesProps {
  loadMore: () => void;
}

const LoadMoreTimelines: React.FC<ILoadMoreTimelinesProps> = ({ loadMore }) => {
  return <LoadMore loadMore={loadMore} />;
};

export default LoadMoreTimelines;
