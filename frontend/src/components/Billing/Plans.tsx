import { makeStyles } from "@mui/styles";
import React from "react";

import { IPricingPlanAPI } from "../../services/Api/Billing";
import PlanItem from "./PlanItem";

const useStyles = makeStyles({
  planWrapper: {
    width: "100%",
    paddingBottom: "10px",
  },
  plans: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: "2em 1em",
  },
});

interface IPlansProps {
  plans: IPricingPlanAPI[];
}

const Plans: React.FunctionComponent<IPlansProps> = ({ plans }) => {
  const classes = useStyles();

  return (
    <div className={classes.planWrapper}>
      <div className="w-full grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3 items-center justify-center  gap-3 lg:gap-4">
        {React.Children.toArray(plans.map((plan) => <PlanItem plan={plan} />))}
      </div>
    </div>
  );
};

export default Plans;
