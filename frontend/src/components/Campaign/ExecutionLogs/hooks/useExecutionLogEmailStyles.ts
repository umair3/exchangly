import { makeStyles } from "@mui/styles";
import React from "react";

interface IColor {
  [key: string]: React.CSSProperties["color"];
}
export const color: IColor = {
  sent: "var(--primary)",
  delivered: "var(--secondary)",
  opened: "var(--secondary30)",
  clicked: "var(--mainThemeColor)",
};

const useStyles = makeStyles({
  emailsSentBackground: {
    backgroundColor: color.sent,
    color: "var(--light)",
    textShadow: "0px 0px 1px var(--light)",
    fontWeight: "lighter",
  },
  emailsSentColor: {
    color: color.sent,
  },
  emailsDeliveredBackground: {
    backgroundColor: color.delivered,
    color: "var(--light)",
    textShadow: "0px 0px 1px var(--light)",
    fontWeight: "lighter",
  },
  emailsDeliveredColor: {
    color: color.delivered,
  },

  emailsOpenedBackground: {
    backgroundColor: color.opened,
    color: "var(--light)",
    textShadow: "0px 0px 1px var(--light)",
    fontWeight: "lighter",
  },
  emailsOpenedColor: {
    color: color.opened,
  },
  emailsClickedBackground: {
    backgroundColor: color.clicked,
    color: "var(--light)",
    textShadow: "0px 0px 1px var(--light)",
    fontWeight: "lighter",
  },
  emailsClickedColor: {
    color: color.clicked,
  },
});

export function useExecutionLogEmailStyles() {
  return useStyles();
}
