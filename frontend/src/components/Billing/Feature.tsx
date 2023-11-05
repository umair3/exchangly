import DoneIcon from "@mui/icons-material/Done";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
  featureContainer: {
    marginBottom: " 6px",
    fontSize: "0.8rem",
    lineHeight: "inherit",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    color: "var(--secondary)",
    marginRight: "6px",
  },
  featureName: {
    marginBottom: "6px",
    fontSize: "1rem",
    fontWeight: 300,
    marginRight: "10px",
  },
});

interface IFeatureProps {
  name: string;
}

const Feature: React.FunctionComponent<IFeatureProps> = ({ name }) => {
  const classes = useStyles();
  return (
    <div className={classes.featureContainer}>
      <DoneIcon className={classes.icon} />
      <div className={classes.featureName}>{name}</div>
    </div>
  );
};

export default Feature;
