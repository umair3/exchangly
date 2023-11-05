import { IAddonWithChargeOption } from "../../../features/billing";
import { request } from "../../../utils";

export class BillingService {
  static getSubscriptions() {
    return request({
      url: "/subscriptions/",
    });
  }

  static getPricingPlans() {
    return request({
      url: "/pricing_plans/",
    });
  }

  static getChargeOptionById(id: number) {
    return request({
      url: `/charge_options/?pricingplanId=${id}`,
    });
  }

  static getPlanById(id: number) {
    return request({
      url: `/pricing_plans/${id}/`,
    });
  }

  static createOrder(chargeOptionId: number, addons: IAddonWithChargeOption[]) {
    const addonsArray = addons.length
      ? addons.map((addon) => ({ productId: addon.chargeOptionId, qty: 1 }))
      : [];

    return request({
      url: "/orders/",
      method: "POST",
      data: {
        promoCode: "",
        skipTrial: "1",
        items: [
          {
            productId: chargeOptionId,
            qty: 1,
          },
          ...addonsArray,
        ],
      },
    });
  }

  static createPayment(orderId: number, paymentGateway: string = "stripe") {
    return request({
      url: "/payments/",
      method: "POST",
      data: {
        order: orderId,
        paymentGateway,
      },
    });
  }

  static cancelSubscription(subscriptionId: number) {
    return request({
      url: "/subscriptions/cancel",
      method: "PUT",
      data: {
        subscription_id: subscriptionId,
      },
    });
  }

  static getPaymentMethods() {
    return request({
      url: "/payment_methods/",
    });
  }

  static createPaymentMethod() {
    return request({
      url: "/payment_methods/",
      method: "POST",
    });
  }

  static getPayments(currentPage: number = 1) {
    return request({
      url: `/payments/?page=${currentPage}`,
    });
  }
}
