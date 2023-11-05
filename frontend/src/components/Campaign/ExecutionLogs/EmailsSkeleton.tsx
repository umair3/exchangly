import { Skeleton } from "@mui/material";
import React from "react";

interface IEmailsSkeletonProps {}

const EmailsSkeleton: React.FC<IEmailsSkeletonProps> = (props) => {
  return (
    <React.Fragment>
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </React.Fragment>
  );
};

export default EmailsSkeleton;
