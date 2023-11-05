import { makeStyles } from "@mui/styles";
import React from "react";

import {
  color,
  useExecutionLogEmailStyles,
} from "./hooks/useExecutionLogEmailStyles";

const useStyles = makeStyles({
  container: {
    display: "flex",
    opacity: 0.9,
    width: "100%",
    flexWrap: "wrap",
  },
  children: {
    minWidth: "300px",
    flex: "1 1 25%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    boxShadow: "10px 10px 5px var(--light20)",
    textShadow: "0px 0px 1px var(--light)",
    gap: "0.2em",
    fontSize: "1.2rem",
    padding: "0.5em 2.5em",
    color: "var(--light)",

    fontWeight: "light",
    outline: "none",
    border: "none",
  },

  sent: {
    "&::after": {
      content: "''",
      position: "absolute",
      width: "30%",
      top: 0,
      left: "78%",

      zIndex: 1,
      backgroundColor: color.sent,

      height: "100%",
      clipPath: "polygon(75% 0%,100% 50%,75% 100%,0% 100%,0% 50%,0% 0%)",
    },
  },

  delivered: {
    "&::after": {
      content: "''",
      position: "absolute",
      width: "30%",
      top: 0,
      left: "78%",

      zIndex: 1,
      backgroundColor: color.delivered,

      height: "100%",
      clipPath: "polygon(75% 0%,100% 50%,75% 100%,0% 100%,0% 50%,0% 0%)",
    },
  },

  opened: {
    "&::after": {
      content: "''",
      position: "absolute",
      width: "30%",
      top: 0,
      left: "78%",

      zIndex: 1,
      backgroundColor: color.opened,

      height: "100%",
      clipPath: "polygon(75% 0%,100% 50%,75% 100%,0% 100%,0% 50%,0% 0%)",
    },
  },

  "@media screen and (max-width:1405px)": {
    opened: {
      "&::after": {
        content: "none",
      },
    },
  },

  "@media screen and (max-width:1100px)": {
    container: {
      gap: "0.5em",
    },
    children: {
      borderRadius: "1em",
    },
    sent: {
      "&::after": {
        content: "none",
      },
    },
    delivered: {
      "&::after": {
        content: "none",
      },
    },
  },
});

interface ITopEmailCountHeaderProps {
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
}

const TopEmailCountHeader: React.FC<ITopEmailCountHeaderProps> = ({
  sent,
  delivered,
  opened,
  clicked,
}) => {
  const classes = useStyles();
  const styles = useExecutionLogEmailStyles();

  return (
    <div className={classes.container}>
      <div
        className={`${classes.children}  ${styles.emailsSentBackground} ${classes.sent}`}
      >
        <h3>{sent}</h3>
        <p>Emails Sent</p>
      </div>

      <div
        className={`${classes.children}  ${styles.emailsDeliveredBackground} ${classes.delivered}`}
      >
        <h3>{delivered}</h3>
        <p>Emails Delivered</p>
      </div>

      <div
        className={`${classes.children} ${styles.emailsOpenedBackground} ${classes.opened}`}
      >
        <h3>{opened}</h3>
        <p>Emails Opened/Read</p>
      </div>

      <div className={`${classes.children} ${styles.emailsClickedBackground}`}>
        <h3>{clicked}</h3>
        <p>Link/Button Clicked</p>
      </div>
    </div>
  );
};

export default TopEmailCountHeader;
