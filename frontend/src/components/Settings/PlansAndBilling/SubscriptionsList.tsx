import React from "react";
import { useAppSelector } from "../../../app/hooks";
import SubscriptionItem from "./SubscriptionItem";

interface ISubscriptionsListProps {}

const SubscriptionsList: React.FC<ISubscriptionsListProps> = (props) => {
  const subscriptions = useAppSelector((state) => state.billing.subscriptions);

  if (!subscriptions.length) {
    return (
      <div className="text-md  d-flex items-center justify-center md:p-2">
        <h4 className="h-full">No subscriptions found</h4>
      </div>
    );
  }

  return (
    <div className="md:bg-white md:p-4 rounded-md">
      {subscriptions.map((subscription) => (
        <SubscriptionItem key={subscription.id} {...subscription} />
      ))}
    </div>
  );
};

export default SubscriptionsList;
