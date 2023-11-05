import React from "react";
import { usePaymentMethods } from "../../../services/Api/Billing";
import { SimpleLoader } from "../../Common";
import AddCard from "./AddCard";
import SinglePaymentMethod from "./SinglePaymentMethod";

interface IPaymentMethodsProps {}

const PaymentMethods: React.FC<IPaymentMethodsProps> = (props) => {
  const { isLoading, paymentMethods } = usePaymentMethods();

  return (
    <div className="my-4 md:my-6 bg-gray-50 py-4 px-3 md:px-6 md:p-6 md:rounded-md  ">
      <div className="md:grid md:grid-cols-4 md:gap-6">
        <div className="bg-secondary/80 shadow md:shadow-none text-white p-2 text-center md:text-left rounded-md  md:rounded-none md:p-0  md:bg-transparent md:col-span-1 ">
          <h3 className="md:text-xl font-bold leading-6 md:text-gray-900 ">
            Credit Cards
          </h3>
          <p className=" text-sm md:text-md font-bold md:text-gray-500">
            Add as many credit cards as you want
          </p>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-3 ">
          {isLoading && <SimpleLoader />}
          {paymentMethods.map((payment) => (
            <SinglePaymentMethod key={payment.id} {...payment} />
          ))}
          <div className="my-6 ">
            <AddCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
