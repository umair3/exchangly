import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";

import { AlertReducer } from "../features/alert";
import { ImportContactsReducer, AudienceReducer } from "../features/audience";
import { BillingReducer } from "../features/billing";
import { StripeReducer } from "../features/stripe";
import { UserReducer } from "../features/user";
import { CampaignReducer, CreateCampaignReducer } from "../features/campaign";
import { ActivityReducer } from "../features/activity";
import { UserJourneyReducer } from "../features/userJourney";
import { TemplateReducer } from "../features/template";

const campaignRootReducer = combineReducers({
  main: CampaignReducer,
  createCampaign: CreateCampaignReducer,
});

const audienceRootReducer = combineReducers({
  root: AudienceReducer,
  importAudience: ImportContactsReducer,
});

export const store = configureStore({
  reducer: {
    billing: BillingReducer,
    user: UserReducer,
    alerts: AlertReducer,
    stripe: StripeReducer,
    audience: audienceRootReducer,
    campaign: campaignRootReducer,
    activity: ActivityReducer,
    userJourney: UserJourneyReducer,
    template: TemplateReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
