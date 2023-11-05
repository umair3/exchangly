import { IPaginationType } from "../CommonTypesAPI";

export interface ISubscriptionAPI {
  status: "PENDING" | "ACTIVE" | "TRIAL " | "CANCELLED";
  id: number;
  plan: number;
  user: number;
  order: number;
  charge_option: number;
  payment_gateway: string;
  payment_gateway_customer_id: string;
  payment_gateway_auth_code: null | string;
  trial_status: string;
  status_update_time: string;
  created: string;
  updated: string;
  expiry: string;
  coupon: null | string;
  access_type: "PLAN" | "CONSULTANT" | "FORMS2EMAIL" | "NO_ACCESS";
}

export interface ISubscriptionResponseAPI {
  data: IPaginationType<ISubscriptionAPI>;
}

export interface IPlanJSON {
  emails?: number;
  contacts?: number;
  emailSupport?: boolean;
  phoneSupport?: boolean;
  NoDailySendingLimit?: boolean;
  additional?: string;
  recommended: boolean;
  showCurrentPlan: boolean;
}

interface IUIJson {
  ui_json: IPlanJSON;
}
interface IPlan {
  id: number;
  created: string;
  title: string;
  desc: string;
  plan_type: "INDIVIDUAL" | "ENTERPRISE";
  access_type: "PLAN" | "CONSULTANT" | "FORMS2EMAIL" | "NO_ACCESS";
  trialDurationInDays: number;
  is_addon: boolean;
  status: string;
  order: number;
  link: string;
  tag: null | string;
}

export interface ICustomPlan extends IPlan {
  ui_json: Partial<IPlanJSON>;
}

interface IAddons {
  addons: ICustomPlan[];
}

export interface IPricingPlanAPI extends IPlan, IUIJson, IAddons {}

export interface IPricingPlansResponseAPI {
  data: IPricingPlanAPI[];
}

export interface ISinglePricingPlanByIdAPI {
  data: IPricingPlanAPI;
}

export interface IChargeOptionAPI {
  bundle_only: boolean;
  country: string;
  currency: string;
  id: number;
  option_type: string;
  order: number;
  price: string;
  pricing_plan: number;
  recurring: boolean;
  status: string;
  upsell: number | null;
  upsell_discount: string;
  upsell_message: string;
}

export interface IChargeOptionResponseAPI {
  data: IChargeOptionAPI[];
}

export interface ICreateOrderAPI {
  order: {
    id: number;
    email: string;
    promo: string;
    user: number;
    sub_total: string;
    discount: string;
    tax: string;
    total: string;
    status: string;
    currency: string;
    recurring_amount: string;
    discount_with_recurring_coupon: string;
    coupon_usage_credit: string;
    total_with_recurring_coupon: string;
    created: string;
    updated: string;
  };
  message: string;
}

export interface ICreateOrderResponseAPI {
  data: ICreateOrderAPI;
}

export interface ICreatePaymentAPI {
  clientSecret: string;
}

export interface ICreatePaymentResponseAPI {
  data: ICreatePaymentAPI;
}

export interface IPaymentMethodsAPI {
  id: number;
  created: string;
  updated: string;
  payment_gateway: number;
  pg_payment_method_id: string;
  verified: boolean;
  active: boolean;
  last_4_digits: string;
}

export interface IPaymentMethodsResponseAPI {
  data: IPaginationType<IPaymentMethodsAPI>;
}

export interface IPaymentsAPI {
  id: number;
  order: number;
  userId: number;
  paymentGateway: "stripe";
  amount: number;
  currency: string;
  discount: number;
  status: "cancelled" | "pending" | "complete" | "uncaptured";
  created: string;
  updated: string;
}

export interface IPaymentsResponseAPI {
  data: IPaginationType<IPaymentsAPI>;
}

export interface ICreatePaymentMethodAPI {
  clientSecret: string;
}

export interface ICreatePaymentMethodResponseAPI {
  data: ICreatePaymentMethodAPI;
}
