import React from "react";

import {
  PaymentCardDetail,
  PaymentSectionDetailLayout,
  PurchaseSummary,
  Receipt,
} from ".";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ShowAlert } from "../../features/alert";
import { getCurrentSubscription } from "../../features/billing";
import { useLoading } from "../../hooks";
import {
  ICreatePaymentResponseAPI,
  useCreatePayment,
} from "../../services/Api/Billing";
import { CircularLoader, CustomButton, SimpleLoader } from "../Common";
import { useStripeCardHook } from "../Stripe/hooks";
import { usePaymentProcessing } from "../Stripe/hooks/usePaymentProcessing";

interface IPaymentSectionProps {}

const PaymentSection: React.FunctionComponent<IPaymentSectionProps> = (
  props
) => {
  const orderDetail = useAppSelector((state) => state.billing.orderDetail);

  const checkRequiredCard = useStripeCardHook()[2];
  const profile = useAppSelector((state) => state.user.profile);
  const [stripeProcessing, setStripeProcessing] = useLoading(false);
  const [subscriptionLoading, setSubscriptionLoading] = useLoading(false);
  const dispatch = useAppDispatch();
  const { processPayment } = usePaymentProcessing();
  const { isLoading: createPaymentLoading, createPayment } =
    useCreatePayment<ICreatePaymentResponseAPI>({
      onSuccess: (response) => {
        const { clientSecret } = response.data || {};

        if (clientSecret) {
          handleStripe(clientSecret);
        }
      },
    });

  const handleStripe = async (clientSecret: string) => {
    setStripeProcessing(true);
    const result = await processPayment(clientSecret);
    setStripeProcessing(false);
    if (!result) {
      ShowAlert({
        status: "error",
        message: "Something is went wrong",
      });
      return;
    }

    const { error, paymentIntent } = result;

    if (error) {
      ShowAlert({
        status: "error",
        message: `Payment Failed ${error.message}`,
      });
    } else if (paymentIntent) {
      handleSubscription();
    }
  };

  const handleSubscription = () => {
    setSubscriptionLoading(true);

    setTimeout(
      () =>
        dispatch(
          getCurrentSubscription({
            onFinally: () => setSubscriptionLoading(false),
            onSuccess: () =>
              ShowAlert({
                status: "success",
                message: "You have successfully subscribed to this offer",
              }),
          })
        ),
      3000
    );
  };

  const onPayNow = () => {
    if (
      checkRequiredCard() &&
      orderDetail &&
      orderDetail.order &&
      orderDetail.order.id
    ) {
      createPayment(orderDetail.order.id);
    }
  };

  return (
    <>
      {subscriptionLoading && <CircularLoader />}

      <div className="mt-10 w-full ">
        <div className="grid gap-8 xl:gap-28 md:grid-cols-7 w-full ">
          <div className="md:col-span-4 lg:col-span-5 ">
            <PaymentSectionDetailLayout name="Payment method">
              <PaymentCardDetail />
            </PaymentSectionDetailLayout>
          </div>
          <div className="md:col-span-3 lg:col-span-2 ">
            <PurchaseSummary>
              {(summaryClasses) => {
                return (
                  <React.Fragment>
                    {orderDetail &&
                      orderDetail.order &&
                      orderDetail.order.total && (
                        <div className={summaryClasses.estimatedTotal}>
                          <div className="total">Total</div>
                          <div className="price">
                            ${parseFloat(orderDetail.order.total)}
                          </div>
                        </div>
                      )}

                    <div className={summaryClasses.buttonContainer}>
                      {!createPaymentLoading && !stripeProcessing && (
                        <CustomButton
                          onClick={onPayNow}
                          style={{ width: "100%" }}
                        >
                          Pay Now
                        </CustomButton>
                      )}

                      {(createPaymentLoading || stripeProcessing) && (
                        <SimpleLoader />
                      )}
                    </div>

                    <div className="my-4">
                      <div className={summaryClasses.disclaimer}>
                        *When you exceed your limit, you need to upgrade your
                        plan.
                      </div>
                    </div>
                  </React.Fragment>
                );
              }}
            </PurchaseSummary>
            {profile && profile.email && <Receipt email={profile.email} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSection;
