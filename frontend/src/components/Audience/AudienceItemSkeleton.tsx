import { Skeleton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { motion } from "framer-motion";

import { useTableStyles } from "../../hooks";

const useStyles = makeStyles({
  headerText: {
    fontSize: "1.4rem",
    color: "var(--primary)",
    letterSpacing: "1px",
    fontWeight: 600,
  },
  list: {
    marginTop: "30px",
    height: "auto",
    maxHeight: "500px",
    overflowY: "auto",
  },

  "@media screen and (max-width:600px)": {
    headerText: {
      fontSize: "1.2rem",
    },
  },
});

const skeletonArray = new Array(10).fill("*");

interface IAudienceItemSkeletonProps {}

const AudienceItemSkeleton: React.FC<IAudienceItemSkeletonProps> = (props) => {
  const classes = useStyles();

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
            <td className={tableStyles.tableData}>
              <Skeleton width="50%" />
            </td>
          </tr>
        ))
      )}
    </React.Fragment>
  );
};

export default AudienceItemSkeleton;
