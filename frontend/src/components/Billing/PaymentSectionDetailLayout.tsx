import React from "react";

interface IPaymentSectionDetailLayoutProps {
  name: string;
  children: React.ReactNode;
}

const PaymentSectionDetailLayout: React.FunctionComponent<
  IPaymentSectionDetailLayoutProps
> = ({ name, children }) => {
  return (
    <div className="grid my-2 gap-4 lg:gap-14 p-2 w-full grid-cols-7 md:pb-10 md:border-b md:border-gray-100">
      <div className="font-bold mt-2 text-secondary col-span-7 md:col-span-3 lg:col-span-2">
        {name}
      </div>

      <div className="col-span-7 md::col-span-4 lg:col-span-5">{children}</div>
    </div>
  );
};

export default PaymentSectionDetailLayout;
