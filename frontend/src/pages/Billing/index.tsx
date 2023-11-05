import React from "react";

import { PaymentSection, SelectionSection } from "../../components/Billing";

import { usePricingPlans } from "../../services/Api/Billing";
import {
  CircularLoader,
  CustomAlert,
  CustomBreadCrumbs,
  PageTransitions,
  TitleHeader,
} from "../../components/Common";
import { useBreadCrumbs } from "../../hooks";

import useBillingStyles from "./useBillingStyles";
import { useLogout } from "../../services/Api/User/hooks";

export enum valuesEnum {
  Selection = "Selection",
  Payment = "Payment",
}

const breadcrumbValues: string[] = [valuesEnum.Selection, valuesEnum.Payment];

function BillingPage(): React.ReactElement {
  const { classes } = useBillingStyles();

  const { logout, loading: logoutLoading } = useLogout();

  const { selectedValue, changeSelectValue, switchToSection, getIndex } =
    useBreadCrumbs<typeof valuesEnum>({
      type: valuesEnum,
      initialState: breadcrumbValues,
      value: valuesEnum.Selection,
    });

  const { isLoading: queryLoading, plans } = usePricingPlans();

  return (
    <React.Fragment>
      {(queryLoading || logoutLoading) && <CircularLoader />}
      <TitleHeader
        title="Account Setup"
        subtitle="Billing"
        button="Logout"
        onButtonClick={logout}
      />
      <PageTransitions>
        <div className={classes.container}>
          <div className="wrapper">
            <CustomBreadCrumbs
              values={breadcrumbValues}
              selectedValue={selectedValue}
              onClick={changeSelectValue}
            />
            {selectedValue === getIndex(valuesEnum.Selection) && (
              <SelectionSection
                switchToOtherSection={() => switchToSection(valuesEnum.Payment)}
                plans={plans}
              />
            )}
            {selectedValue === getIndex(valuesEnum.Payment) && (
              <PaymentSection />
            )}
          </div>
        </div>
        <CustomAlert />
      </PageTransitions>
    </React.Fragment>
  );
}

export default BillingPage;
