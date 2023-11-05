import React from "react";
import { makeStyles } from "@mui/styles";

import CampaignList from "./CampaignList";

import { CustomPagination } from "../Common";
import { useCampaignListAPI } from "../../services/Api/Campaign/hooks";

const useStyles = makeStyles({
  layout: {
    width: "100%",
  },
  paginationContainer: {
    width: "100%",
    marginBlock: "1em",
    display: "flex",
    justifyContent: "center",
  },
});

interface IListViewProps {}

const ListView: React.FC<IListViewProps> = (props) => {
  const classes = useStyles();

  const { list, currentPage, changeCurrentPage, totalPages } =
    useCampaignListAPI();

  const changePage = (_e: React.ChangeEvent<unknown>, page: number) => {
    changeCurrentPage(page);
  };

  return (
    <React.Fragment>
      <div className={classes.layout}>
        <CampaignList list={list} resultsFound={list.length} />
        <div className={classes.paginationContainer}>
          <CustomPagination
            totalPages={totalPages}
            currentPage={currentPage}
            onChange={changePage}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default React.memo(ListView);
