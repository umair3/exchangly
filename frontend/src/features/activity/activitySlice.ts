import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IActivityFilter {
  label: string;
  value: string;
}

export const optionsActivityFilter: IActivityFilter[] = [
  { label: "All Activities", value: "" },
  { label: "Billing", value: "BILLING" },
  { label: "Audience", value: "AUDIENCE" },
  { label: "Campaign", value: "CAMPAIGN" },
  { label: "Scheduler", value: "SCHEDULER" },
  { label: "Integration", value: "INTEGRATION" },
  { label: "Email Identity", value: "EMAIL_IDENTITY" },
  { label: "Domain Identity", value: "VERIFY_DOMAIN_CREDS" },
  { label: "Campaign Execution", value: "CAMPAIGN_EXECUTION" },
];

export interface IActivityState {
  filterBy: IActivityFilter;
}

const initialState: IActivityState = {
  filterBy: optionsActivityFilter[0],
};

export const ActivitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    setActivityFilter: (state, action: PayloadAction<IActivityFilter>) => {
      state.filterBy = action.payload;
    },

    setInitialActivityState: (_state) => {
      return initialState;
    },
  },
});

export const { setActivityFilter, setInitialActivityState } =
  ActivitySlice.actions;

export default ActivitySlice.reducer;
