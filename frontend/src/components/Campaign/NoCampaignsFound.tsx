import React from "react";
import { makeStyles } from "@mui/styles";
import { BiSad } from "react-icons/bi";

const useStyles = makeStyles({
  wrapper: {
    display: "flex",

    alignItems: "center",

    marginBlock: "0.2em",
    padding: "1em",

    textShadow: "0 0 1px var(--light)",
    backgroundColor: "var(--secondary)",

    borderRadius: "0.5em",

    color: "var(--light)",

    fontSize: "1.1rem",

    gap: "0.4em",
  },
});

interface INoCampaignsFoundProps {}

const NoCampaignsFound: React.FC<INoCampaignsFoundProps> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <BiSad fontSize="1.5rem" />
      <div>
        Records found 0...click on "Create Campaign" to start a new campaign.
      </div>
    </div>
  );
};

export default NoCampaignsFound;
