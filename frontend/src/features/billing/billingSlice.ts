import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ICreateOrderAPI, ISubscriptionAPI } from "../../services/Api/Billing";

export interface IAddonWithChargeOption {
  id: number;
  price: number;
  chargeOptionId: number;
  title: string;
}

export interface ISelectedPlanWithChargeOptions {
  planId: number;
  planName: string;
  chargeOptionId: number | undefined;
  contacts?: number;
  emails?: number;
  price: string | undefined;
  addons: IAddonWithChargeOption[];
}

export type OrderDetail = Omit<ICreateOrderAPI, "message">;

export interface IBillingState {
  subscriptions: ISubscriptionAPI[];
  selectedPlan: null | ISelectedPlanWithChargeOptions;
  orderDetail: null | OrderDetail;
}

const initialState: IBillingState = {
  subscriptions: [],
  selectedPlan: null,
  orderDetail: null,
};

export const billingSlice = createSlice({
  name: "billing",
  initialState,
  reducers: {
    setSubscription: (state, action: PayloadAction<ISubscriptionAPI[]>) => {
      state.subscriptions = action.payload;
    },

    removeSubscription: (state) => {
      state.subscriptions = [];
    },

    setSelectedPlan: (
      state,
      action: PayloadAction<ISelectedPlanWithChargeOptions>
    ) => {
      state.selectedPlan = action.payload;
    },

    removeSelectedPlan: (state) => {
      state.selectedPlan = null;
    },

    addAddon: (state, action: PayloadAction<IAddonWithChargeOption>) => {
      state.selectedPlan?.addons.push(action.payload);
    },

    removeAddon: (state, action: PayloadAction<IAddonWithChargeOption>) => {
      state.selectedPlan!.addons = state.selectedPlan!.addons.filter(
        (addon) => addon.id !== action.payload.id
      );
    },

    setOrderDetail: (state, action: PayloadAction<OrderDetail>) => {
      state.orderDetail = action.payload;
    },

    removeOrderDetail: (state) => {
      state.orderDetail = null;
    },
  },
});

export const {
  setSubscription,
  removeSubscription,
  setSelectedPlan,
  removeSelectedPlan,
  addAddon,
  removeAddon,
  setOrderDetail,
  removeOrderDetail,
} = billingSlice.actions;

export default billingSlice.reducer;
