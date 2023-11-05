import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ViewEnum } from "../../components/Campaign/View";

export interface ICampaignState {
  tab: ViewEnum;
  viewByStatus: string;
  viewByCampaign: string;
}

const initialState: ICampaignState = {
  tab: ViewEnum.LIST_VIEW,
  viewByStatus: "",
  viewByCampaign: "",
};

export const CampaignSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {
    changeTab: (state, action: PayloadAction<ViewEnum>) => {
      state.tab = action.payload;
    },
    changeCampaign: (state, action: PayloadAction<string>) => {
      state.viewByCampaign = action.payload;
    },

    changeStatus: (state, action: PayloadAction<string>) => {
      state.viewByStatus = action.payload;
    },

    resetCampaignState: (_state) => {
      return initialState;
    },
  },
});

export const { changeTab, changeCampaign, changeStatus, resetCampaignState } =
  CampaignSlice.actions;

export default CampaignSlice.reducer;
