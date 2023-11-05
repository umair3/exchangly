import { Skeleton } from "@mui/material";

import React from "react";
import { useTableStyles } from "../../../hooks";

const skeletonArray = new Array(3).fill("*");

interface IEmailIdentitiesSkeletonProps {}

const EmailIdentitiesSkeleton: React.FC<IEmailIdentitiesSkeletonProps> = (
  props
) => {
  const tableStyles = useTableStyles();

  return (
    <React.Fragment>
      {React.Children.toArray(
        skeletonArray.map((_value) => (
          <tr className={tableStyles.tableBodyRow}>
            <td className={tableStyles.tableData}>
              <Skeleton width="10%" />
            </td>
            <td className={tableStyles.tableData}>
              <Skeleton width="100%" />
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

export default EmailIdentitiesSkeleton;
