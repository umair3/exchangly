import { makeStyles } from "@mui/styles";
import React from "react";

import { ActivityHeroSection, ActivityList, FilterBy } from ".";
import { IActivityItemProps } from "./ActivityItem";

const useStyles = makeStyles({
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "1.2em",
  },
  filterContainer: {
    display: "flex",
    alignItems: "center",
    gap: "1em",
    flexWrap: "wrap",
  },
  filterBy: {
    marginLeft: "auto",
  },
  typography: {
    fontSize: "1rem",
    opacity: "0.8",
    fontWeight: "bold",
  },
  activityList: {
    paddingBlock: "1em",
  },
});

interface IActivitySectionProps {}

const ActivitySection: React.FC<IActivitySectionProps> = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div className={classes.filterContainer}>
        <h4 className={classes.typography}>Here's what's happening</h4>
        <div className={classes.filterBy}>
          <FilterBy />
        </div>
      </div>
      <div>
        <ActivityHeroSection />
      </div>
      <div className={classes.activityList}>
        <ActivityList />
      </div>
    </div>
  );
};

export default ActivitySection;
