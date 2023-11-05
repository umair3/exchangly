import { AppThunk } from "../../app/store";
import {
  BillingService,
  ICreateOrderResponseAPI,
  ISubscriptionResponseAPI,
} from "../../services/Api/Billing";
import { CallAPI, ICallbacks } from "../../utils/CallAPI";
import {
  IAddonWithChargeOption,
  removeSubscription,
  setOrderDetail,
  setSubscription,
} from "./billingSlice";

export const getCurrentSubscription =
  (props: ICallbacks<ISubscriptionResponseAPI>): AppThunk =>
  (dispatch) => {
    CallAPI<ISubscriptionResponseAPI>({
      call: BillingService.getSubscriptions,
      onError: props.onError,
      onFinally: () => {
        props.onFinally && props.onFinally();
      },
      onSuccess: (response) => {
        if (!response.data) {
          dispatch(removeSubscription());
        } else {
          dispatch(setSubscription(response.data.results));
        }
        props.onSuccess && props.onSuccess(response);
      },
    });
  };

export const createOrderAsync =
  (
    chargeOptionId: number,
    addons: IAddonWithChargeOption[],
    props: ICallbacks<ICreateOrderResponseAPI>
  ): AppThunk =>
  async (dispatch) => {
    CallAPI<ICreateOrderResponseAPI>({
      call: () => BillingService.createOrder(chargeOptionId, addons),
      onSuccess: (response) => {
        if (response.data) {
          dispatch(setOrderDetail(response.data));
          props.onSuccess && props.onSuccess(response);
        }
      },

      onFinally: props.onFinally,
    });
  };
