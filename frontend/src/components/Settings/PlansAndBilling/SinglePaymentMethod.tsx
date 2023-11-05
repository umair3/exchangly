import React from "react";
import { MdCancel, MdDone } from "react-icons/md";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { IPaymentMethodsAPI } from "../../../services/Api/Billing";
import { OpacityTransition } from "../../Common";

dayjs.extend(relativeTime);

interface ISinglePaymentMethodProps extends IPaymentMethodsAPI {}

const SinglePaymentMethod: React.FC<ISinglePaymentMethodProps> = ({
  last_4_digits,
  created,
  active,
  verified,
}) => {
  const icon = (value: boolean) => {
    if (!value) {
      return <MdCancel fontSize="2rem" className="md:ml-auto" />;
    }
    return <MdDone fontSize="2rem" className="md:ml-auto" />;
  };

  return (
    <OpacityTransition
      className={`bg-white border-gray-100 rounded mb-5 max-w-md mx-auto md:max-w-full  p-8 border relative ${
        active && "border-gray-200 border-2 "
      }`}
    >
      {active && (
        <div className="absolute left-0 right-0 -top-4 flex justify-center  font-bold ">
          <div className="max-w-sm px-3 py-1  rounded-full bg-gray-200 text-secondary">
            Active
          </div>
        </div>
      )}
      <div className=" max-w-3xl md:max-w-full mx-auto flex flex-col gap-2 ">
        <div className="flex flex-col gap-3 md:flex-row text-lg font-bold  ">
          <div className="md:w-1/2  text-gray-500">Last 4 digits</div>
          <div className="md:w-1/2 md:text-right  ">
            **** **** **** **** {last_4_digits}
          </div>
        </div>

        <div className="flex flex-col gap-3 md:gap-0 md:flex-row text-md font-bold  ">
          <div className="md:w-1/2 text-gray-500">Added</div>
          <div className="md:w-1/2 md:text-right">
            {dayjs(created).fromNow()}
          </div>
        </div>

        <div className="flex flex-col gap-3 md:flex-row text-md font-bold  ">
          <div className="md:w-1/2 text-gray-500">Active</div>
          <div className="md:w-1/2  text-secondary">{icon(active)}</div>
        </div>

        <div className="flex flex-col md:flex-row text-md font-bold  ">
          <div className="md:w-1/2 text-gray-500">Verified</div>
          <div className="md:w-1/2 text-secondary">{icon(verified)}</div>
        </div>
        {active && (
          <div className="w-full text-sm text-secondary/70 font-bold text-right mt-2">
            *All payments are taken from active card
          </div>
        )}
      </div>
    </OpacityTransition>
  );
};

export default SinglePaymentMethod;
