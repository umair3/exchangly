import React from "react";
import { makeStyles } from "@mui/styles";

import SingleEvent, { ISingleEventProps } from "./SingleEvent";
import { IUserTimelineAPI } from "../../services/Api/UserJourney";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import { OpacityTransition } from "../Common";

dayjs.extend(calendar);

const useStyles = makeStyles({
  timelineSection: {
    marginBottom: "2rem",

    width: "100%",

    "&:last-child": {
      marginBottom: "1rem",
    },
  },

  groupHeader: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "2px solid var(--light50)",
    paddingBottom: ".7rem",
    marginBottom: "1rem",
    fontWeight: "bold",
  },
  groupTitle: {
    color: "var(--dark)",
    opacity: 0.8,
  },
  groupDate: {
    color: "var(--dark)",
    opacity: 0.8,
  },

  eventGrid: {
    display: "grid",
    gridTemplateColumns: "50px 1fr",
    gridTemplateRows: "auto",
    gap: "1rem",
    maxWidth: "750px",
    width: "100%",
    margin: "0 auto",
  },

  "@media screen and (max-width:600px)": {
    eventGrid: {
      gridTemplateColumns: "1fr",
    },
  },
});

interface ITimelineProps {
  date: string;
  events: IUserTimelineAPI[];
}

const Timeline: React.FC<ITimelineProps> = ({ date, events }) => {
  const classes = useStyles();

  return (
    <OpacityTransition>
      <section className={classes.timelineSection}>
        <div className={classes.groupHeader}>
          <div className={classes.groupTitle}>
            {dayjs(date).calendar(null, {
              sameDay: "[Today]",
              nextDay: "[Tomorrow]",
              nextWeek: "[Next] dddd",
              lastDay: "[Yesterday]",
              lastWeek: "[Last] dddd",
              sameElse: "DD/MM/YYYY",
            })}
          </div>
          <div className={classes.groupDate}>
            {dayjs(date).format("dddd, MMM D, YYYY")}
          </div>
        </div>

        <div className={classes.eventGrid}>
          {React.Children.toArray(
            events.map((event) => <SingleEvent {...event} />)
          )}
        </div>
      </section>
    </OpacityTransition>
  );
};

export default Timeline;
