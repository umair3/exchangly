import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
  container: {
    width: "min(100%,70rem)",
    marginInline: "auto",
    borderRadius: "1em",
    border: "2px solid var(--light50)",
  },
});

interface ICampaignContainerProps {}

const CampaignContainer: React.FC<ICampaignContainerProps> = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.container}>{children}</div>;
};

export default React.memo(CampaignContainer);
