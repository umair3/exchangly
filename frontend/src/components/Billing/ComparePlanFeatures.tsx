import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { makeStyles } from "@mui/styles";
import React from "react";

import { useToggle } from "../../hooks";
import PlanFeatures from "./PlanFeatures";

const useStyles = makeStyles({
  planFeatureButton: {
    marginBlock: "2rem 1.5rem",
    display: "flex",
    alignItems: "center",
    color: "var(--secondary)",
    fontWeight: 500,
    fontSize: "1rem",
    cursor: "pointer",
  },
  featureButton: {
    fontSize: "1.1rem",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  featureContainer: {
    animation: "fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
  },
});

interface IComparePlanFeaturesProps {}

const ComparePlanFeatures: React.FunctionComponent<
  IComparePlanFeaturesProps
> = (props) => {
  const classes = useStyles();
  const [showFeatures, toggleShowFeatures] = useToggle(true);

  return (
    <React.Fragment>
      <div className={classes.planFeatureButton} onClick={toggleShowFeatures}>
        {showFeatures ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}

        <div className={classes.featureButton}>Compare Plan Features</div>
      </div>

      {showFeatures && (
        <div className={classes.featureContainer}>
          <PlanFeatures />
        </div>
      )}
    </React.Fragment>
  );
};

export default React.memo(ComparePlanFeatures);
