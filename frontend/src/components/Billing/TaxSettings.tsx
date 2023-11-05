import { Grid } from "@mui/material";
import React from "react";

import { CustomButton, CustomLabelWithInput } from "../Common";

interface ITaxSettingsProps {}

const TaxSettings: React.FC<ITaxSettingsProps> = (props) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={10}>
        <CustomLabelWithInput
          label="Registered VAT/GST/Tax ID (optional)"
          name="tax"
          id="tax"
          type="text"
        />
      </Grid>
      <Grid item container>
        <Grid item xs={2}>
          <CustomButton>Save</CustomButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TaxSettings;
