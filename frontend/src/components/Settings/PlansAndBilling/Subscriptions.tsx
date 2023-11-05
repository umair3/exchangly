import React from "react";
import SubscriptionsList from "./SubscriptionsList";

interface ISubscriptionsProps {}

const Subscriptions: React.FC<ISubscriptionsProps> = (props) => {
  return (
    <div className="my-4 md:my-6 bg-gray-50 py-4 px-3 md:px-6 md:p-6 md:rounded-md  ">
      <div className="md:grid md:grid-cols-4 md:gap-6">
        <div className="bg-secondary/80 shadow md:shadow-none text-white p-2 text-center md:text-left rounded-md  md:rounded-none md:p-0  md:bg-transparent md:col-span-1 ">
          <h3 className="md:text-xl font-bold leading-6 md:text-gray-900 ">
            Subscriptions
          </h3>
          <p className=" text-sm md:text-md font-bold md:text-gray-500">
            Also known as recurring billing
          </p>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-3 ">
          <SubscriptionsList />
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
