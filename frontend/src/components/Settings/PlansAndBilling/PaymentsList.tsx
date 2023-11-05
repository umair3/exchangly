import React from "react";

import { PaymentsTable } from ".";
import { usePagination } from "../../../hooks";
import { usePayments } from "../../../services/Api/Billing";
import { CustomPagination } from "../../Common";

interface IPaymentsListProps {}

const PaymentsList: React.FC<IPaymentsListProps> = (props) => {
  const { currentPage, changeCurrentPage, changeCount, totalPages } =
    usePagination({
      count: 10,
      pageToShow: 1,
    });

  const { payments } = usePayments({
    currentPage,
    callback: (response) => {
      changeCount(response.data.count);
    },
  });
  return (
    <div className="my-4 md:my-6 bg-gray-50 py-4  md:p-6 md:rounded-md  ">
      <div className="md:grid md:grid-cols-4 md:gap-6">
        <div className="bg-secondary/80 shadow md:shadow-none text-white p-2 mx-2 text-center md:text-left rounded-md  md:rounded-none md:p-0  md:bg-transparent md:col-span-1 ">
          <h3 className="md:text-xl font-bold leading-6 md:text-gray-900 ">
            Payments
          </h3>
          <p className=" text-sm md:text-md font-bold md:text-gray-500">
            Here you can view your payment details
          </p>
        </div>
        <div className="mt-5 md:mt-0  md:col-span-3 ">
          <div className="w-full overflow-x-auto pl-2">
            <PaymentsTable paymentsList={payments} />
          </div>

          <div className="mt-2 w-full flex justify-center">
            <CustomPagination
              totalPages={totalPages}
              currentPage={currentPage}
              onChange={(e, page) => changeCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsList;
