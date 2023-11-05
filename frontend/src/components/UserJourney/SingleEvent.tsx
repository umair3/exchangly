import React from "react";
import { makeStyles } from "@mui/styles";
import { MdTimeline, MdNotifications } from "react-icons/md";

import { IUserTimelineAPI } from "../../services/Api/UserJourney";
import dayjs from "dayjs";
import { HtmlRenderer, OpacityTransition } from "../Common";

const useStyles = makeStyles({
  avatar: {
    position: "relative",

    width: "100%",

    "&:after": {
      content: "''",
      position: "absolute",
      backgroundColor: "var(--light20)",
      width: "2px",
      left: 0,
      right: 0,
      top: "50px",
      bottom: "-1rem",

      margin: "0 auto",

      zIndex: -1,
    },

    "&:first-child": {
      "&:before": {
        content: "''",
        position: "absolute",
        backgroundColor: "var(--light20)",
        width: "2px",
        left: 0,
        right: 0,
        top: "-1rem",
        bottom: "100%",

        margin: "0 auto",

        zIndex: -1,
      },
    },

    "&:nth-last-child(2)": {
      "&:after": {
        display: "none",
      },
    },
  },
  icon: {
    width: "50px",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "100%",
    backgroundColor: "var(--light50)",
  },
  card: {
    backgroundColor: "var(--light50)",
    border: "1px solid var(--light50)",
    borderRadius: ".25rem",
    padding: ".75rem",
    overflow: "hidden",
  },
  header: {
    display: "flex",
    gap: ".5rem",
    alignItems: "center",
  },

  eventIcon: {},
  title: {
    flexGrow: 1,
    fontSize: "1rem",
    color: "var(--dark)",
    fontWeight: "bold",
  },
  time: {
    fontWeight: "bold",
  },
  description: {
    backgroundColor: "var(--light)",
    marginTop: ".5rem",
    padding: "1rem",
    borderRadius: ".25rem",
    fontSize: "1rem",

    maxWidth: "100%",
  },

  "@media screen and (max-width:600px)": {
    avatar: {
      display: "none",
    },
  },
});

export interface ISingleEventProps extends IUserTimelineAPI {}

const SingleEvent: React.FC<ISingleEventProps> = ({
  subject,
  updated,
  body,
}) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <OpacityTransition className={classes.avatar}>
        <div className={classes.icon}>
          <MdTimeline style={{ color: "var(--dark)" }} fontSize="1rem" />
        </div>
      </OpacityTransition>

      <OpacityTransition className={classes.card}>
        <div className={classes.header}>
          <div className={classes.eventIcon}>
            <MdNotifications fontSize={"1.8rem"} />
          </div>
          <div className={classes.title}>{subject}</div>
          <div className={classes.time}>{dayjs(updated).format("h:mm a")}</div>
        </div>
        {body && (
          <div className={`${classes.description}  `}>
            <HtmlRenderer html={body} />
          </div>
        )}
      </OpacityTransition>
    </React.Fragment>
  );
};

export default SingleEvent;
