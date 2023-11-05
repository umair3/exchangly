import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { makeStyles } from "@mui/styles";
import React from "react";

import { CustomButton } from ".";

const useStyles = makeStyles({
  header: {
    width: "100%",
    position: "sticky",
    backgroundImage: "var(--gradient)",
    color: "var(--light)",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    zIndex: 100,
    marginBottom: "20px",

    wordSpacing: "4px",
  },
  wrapper: {
    display: "flex",
    alignItems: "center",
    padding: "20px 30px",
    margin: "0 auto",
    fontWeight: 600,
  },
  title: {
    fontSize: "1.3rem",
    margin: "0 10px",
  },
  icon: { fontSize: "18px!important" },
  subtitle: {
    fontSize: "1.2rem",
    margin: "0 10px",
    wordSpacing: "4px",
  },

  buttonWrapper: {
    position: "absolute",
    right: "15px",
    top: "15px",
  },

  "@media screen and (max-width:500px)": {
    buttonWrapper: {
      position: "static",
      display: "flex",
      justifyContent: "end",
      paddingBlock: "0.8em",
    },
  },
});

interface ITitleHeaderProps {
  title: string;
  subtitle?: string;
  button?: string;
  onButtonClick?: () => void;
}

const TitleHeader: React.FC<ITitleHeaderProps> = ({
  title,
  subtitle,
  button,
  onButtonClick,
}) => {
  const classes = useStyles();
  return (
    <header className={classes.header}>
      <div className={classes.wrapper}>
        <div className={classes.title}>{title}</div>
        {subtitle && (
          <>
            <ArrowForwardIosIcon className={classes.icon} />
            <div className={classes.subtitle}>{subtitle}</div>
          </>
        )}
      </div>
      {button && (
        <div className={classes.buttonWrapper}>
          <CustomButton onClick={onButtonClick}>{button}</CustomButton>
        </div>
      )}
    </header>
  );
};

export default TitleHeader;
