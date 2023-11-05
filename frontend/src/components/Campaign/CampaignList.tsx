import React from "react";
import { Skeleton } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { useIsFetchingData } from "../../hooks";

import { ICampaignListAPI } from "../../services/Api/Campaign";
import ListItem from "./ListItem";
import ListItemSkeleton from "./ListItemSkeleton";
import NoCampaignsFound from "./NoCampaignsFound";
import { OpacityTransition } from "../Common";

const useStyles = makeStyles({
  campaignList: {
    width: "100%",
    paddingBlock: "0.2em 0",
  },
  total: {
    fontSize: "1rem",
    backgroundColor: "var(--secondary30)",
    borderRadius: "1em",
    color: "var(--light)",
    padding: "0.5em 1em ",
    marginBottom: "1rem",
    fontWeight: "bold",

    letterSpacing: "1px",
    textAlign: "left",
  },
  list: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1em",
  },
});

interface ICampaignListProps {
  list: ICampaignListAPI[];
  resultsFound: number;
}

const CampaignList: React.FC<ICampaignListProps> = ({ list, resultsFound }) => {
  const classes = useStyles();

  const isFetching = useIsFetchingData(["campaignList"]);

  return (
    <OpacityTransition>
      <div className={classes.campaignList}>
        {isFetching && (
          <div className={classes.list}>
            <Skeleton
              width="100%"
              height={50}
              style={{ borderRadius: "1em" }}
            />
            <ListItemSkeleton />
            <ListItemSkeleton />
            <ListItemSkeleton />
          </div>
        )}

        {!isFetching && (
          <>
            {!!list.length ? (
              <>
                <div className={classes.total}>
                  Total Campaigns Found: <span>({resultsFound})</span>
                </div>
                <div className={classes.list}>
                  {React.Children.toArray(
                    list.map((item) => <ListItem {...item} />)
                  )}
                </div>
              </>
            ) : (
              <NoCampaignsFound />
            )}
          </>
        )}
      </div>
    </OpacityTransition>
  );
};

export default CampaignList;
