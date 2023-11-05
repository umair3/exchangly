import { Grid } from "@mui/material";
import React from "react";

import { COUNTRYLIST } from "../../constants";
import {
  CustomButton,
  CustomLabelWithInput,
  CustomLabelWithSelect,
} from "../Common";

interface IContactAddress {}

const ContactAddress: React.FC<IContactAddress> = (props) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={5}>
        <CustomLabelWithInput
          label="First name"
          name="firstName"
          id="firstName"
          type="text"
        />
      </Grid>
      <Grid item xs={12} sm={5}>
        <CustomLabelWithInput
          label="Last name"
          name="lastName"
          id="lastName"
          type="text"
        />
      </Grid>

      <Grid item xs={12} sm={10}>
        <CustomLabelWithInput
          label="Address"
          name="address"
          id="address"
          type="text"
        />
      </Grid>

      <Grid item xs={12} sm={5}>
        <CustomLabelWithInput
          label="Apt, unit, suite (optional)"
          name="apt"
          id="apt"
          type="text"
        />
      </Grid>

      <Grid item xs={12} sm={5}>
        <CustomLabelWithInput
          label="City"
          name="city"
          id="city"
          type="text"
          placeholder="Rawalpindi"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomLabelWithSelect
          label="Country"
          options={COUNTRYLIST}
          defaultLabelWithValue={{
            label: "Please select a country",
            value: "",
          }}
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <CustomLabelWithInput
          label="Postal code"
          name="postal"
          id="postal"
          type="text"
          placeholder="46000"
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

export default ContactAddress;
