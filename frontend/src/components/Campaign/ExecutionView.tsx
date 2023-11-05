import { makeStyles } from "@mui/styles";
import React from "react";

import { useCampaignExecutionAPI } from "../../services/Api/Campaign/hooks";
import { CustomPagination, SlideTransitionWithOpacity } from "../Common";
import { ILabelValue } from "../Common/CustomSelect";
import ExecutionViewTable from "./ExecutionViewTable";
import FilterByCampaign from "./FilterByCampaign";
import FilterByStatus from "./FilterByStatus";

const useStyles = makeStyles({
  filterContainer: {
    width: "100%",
    marginBlock: "0.5em",
    display: "flex",
    gap: "2em",
    flexWrap: "wrap",
  },
  filterWrapper: {
    width: "min(300px,100%)",
  },

  paginationContainer: {
    paddingInline: "0.2em",
    width: "100%",

    display: "flex",
    justifyContent: "center",
  },

  "@media screen and (max-width:900px)": {
    filterWrapper: {
      paddingInline: "1em",
      width: "100%",
      maxWidth: "400px",
      gap: 0,
      marginBlock: "0",
    },
  },
});

interface IExecutionViewProps {
  options: ILabelValue[];
}

const ExecutionView: React.FC<IExecutionViewProps> = ({ options }) => {
  const classes = useStyles();

  const { list, currentPage, changeCurrentPage, totalPages } =
    useCampaignExecutionAPI();

  const changePage = (_e: React.ChangeEvent<unknown>, page: number) => {
    changeCurrentPage(page);
  };

  return (
    <SlideTransitionWithOpacity>
      <div className={classes.filterContainer}>
        <div className={classes.filterWrapper}>
          <FilterByStatus />
        </div>
        <div className={classes.filterWrapper}>
          <FilterByCampaign options={options} />
        </div>
        <ExecutionViewTable list={list} />
        <div className={classes.paginationContainer}>
          <CustomPagination
            totalPages={totalPages}
            currentPage={currentPage}
            onChange={changePage}
          />
        </div>
      </div>
    </SlideTransitionWithOpacity>
  );
};

export default ExecutionView;
