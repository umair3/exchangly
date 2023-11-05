import React from "react";

import { PageTransitions, TopBar } from "../../../components/Common";
import { ITopBarProps } from "../../../components/Common/TopBar";
import {
  Subscriptions,
  Header,
  PaymentMethods,
  PaymentsList,
} from "../../../components/Settings/PlansAndBilling";

const topBarProps: ITopBarProps = {
  links: [{ name: "Settings" }, { name: "Plans and Billing" }],
};

function PlansAndBillingPage(): React.ReactElement {
  return (
    <React.Fragment>
      <TopBar links={topBarProps.links} />
      <PageTransitions>
        <div className="w-full lg:container mx-auto py-6  md:p-12">
          <Header title="Plans & Billing" />
          <Subscriptions />
          <PaymentMethods />

          <PaymentsList />
        </div>
      </PageTransitions>
    </React.Fragment>
  );
}

export default PlansAndBillingPage;
