import Grid from "@mui/material/Grid";
import React from "react";

import { PLAN_FEATURES } from "./constants";
import Feature from "./Feature";

interface IPlanFeaturesProps {}

const PlanFeatures: React.FunctionComponent<IPlanFeaturesProps> = (props) => {
  return (
    <Grid container spacing={2}>
      {Object.keys(PLAN_FEATURES).map((key) => {
        return (
          <Grid item xs={12} sm={6} lg={4} xl={3} key={PLAN_FEATURES[key].id}>
            <h4
              style={{
                fontWeight: 600,
                fontSize: "1rem",
                marginBottom: "8px",
              }}
            >
              {PLAN_FEATURES[key].description}
            </h4>
            {PLAN_FEATURES[key].features.map((name, index) => (
              <Feature name={name} key={index} />
            ))}
          </Grid>
        );
      })}
    </Grid>
  );
};

export default PlanFeatures;
