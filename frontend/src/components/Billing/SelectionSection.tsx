import { makeStyles } from "@mui/styles";
import React, { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { ComparePlanFeatures, Plans, PurchaseSummary } from ".";
import { useAppSelector } from "../../app/hooks";
import { useBillingActions } from "../../features/billing";
import { useLoading } from "../../hooks";
import { IPricingPlanAPI } from "../../services/Api/Billing";
import { CustomButton, SimpleLoader } from "../Common";

interface ISelectionSectionProps {
  switchToOtherSection?: () => void;
  plans: IPricingPlanAPI[];
}

const SelectionSection: React.FunctionComponent<ISelectionSectionProps> = ({
  switchToOtherSection,
  plans,
}) => {
  const { removeOrderDetail, createOrderAsync } = useBillingActions();
  const orderDetail = useAppSelector((state) => state.billing.orderDetail);
  const [mutationLoading, setMutationLoading] = useLoading();

  const selectedPlan = useAppSelector((state) => state.billing.selectedPlan);

  useEffect(() => {
    if (orderDetail) {
      removeOrderDetail();
    }
  }, []);

  const onCreateOrder = () => {
    if (selectedPlan && selectedPlan.chargeOptionId) {
      setMutationLoading(true);

      createOrderAsync(selectedPlan.chargeOptionId, selectedPlan.addons, {
        onFinally: () => setMutationLoading(false),
        onSuccess: () => switchToOtherSection && switchToOtherSection(),
      });
    }
  };

  return (
    <>
      <div className="mt-8 md:max-w-7xl  grid justify-center lg:gap-4 md:grid-cols-7  ">
        <div className="order-2 w-full  lg:order-1 md:col-span-7 lg:col-span-5">
          <Plans plans={plans} />
        </div>

        <div className="order-1 w-full  mb-6 md:mb-0 lg:order-2 md:col-span-7 lg:col-span-2">
          <PurchaseSummary isSticky={true}>
            {(summaryClasses) => {
              return (
                <React.Fragment>
                  <div className={summaryClasses.disclaimer}>
                    *When you exceed your limit, you need to upgrade your plan.
                  </div>
                  <div className={summaryClasses.buttonContainer}>
                    {!mutationLoading && (
                      <CustomButton
                        onClick={onCreateOrder}
                        style={{ width: "100%" }}
                      >
                        Next
                      </CustomButton>
                    )}

                    {mutationLoading && <SimpleLoader />}
                  </div>
                </React.Fragment>
              );
            }}
          </PurchaseSummary>
        </div>
      </div>

      <div className="my-3  max-w-5xl">
        <ComparePlanFeatures />
      </div>
    </>
  );
};

export default SelectionSection;
