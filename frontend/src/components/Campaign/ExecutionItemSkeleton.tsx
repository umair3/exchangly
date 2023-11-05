import { Skeleton } from "@mui/material";
import React from "react";
import { useTableStyles } from "../../hooks";

interface IExecutionItemSkeletonProps {}

const ExecutionItemSkeleton: React.FC<IExecutionItemSkeletonProps> = (
  props
) => {
  const tableStyles = useTableStyles();

  return (
    <React.Fragment>
      {React.Children.toArray(
        new Array(3).fill("*").map(() => (
          <tr className={tableStyles.tableBodyRow}>
            <td className={tableStyles.tableData}>
              <Skeleton width="30%" />
            </td>
            <td className={tableStyles.tableData}>
              <Skeleton width="90%" />
            </td>
            <td className={tableStyles.tableData}>
              <Skeleton width="50%" />
            </td>
            <td className={tableStyles.tableData}>
              <Skeleton width="50%" />
            </td>
            <td className={tableStyles.tableData}>
              <Skeleton width="50%" />
            </td>
          </tr>
        ))
      )}
    </React.Fragment>
  );
};

export default ExecutionItemSkeleton;
