import React, { useMemo } from "react";
import dayjs from "dayjs";

import {
  ISubscriptionAPI,
  useChargeOption,
  usePlanById,
} from "../../../services/Api/Billing";
import {
  checkActiveDate,
  extractDecimalPointsFromString,
} from "../../../utils";
import { CustomModal, OpacityTransition } from "../../Common";

import { useToggle } from "../../../hooks";
import CancelSubscription from "./CancelSubscription";

interface ISubscriptionItemProps extends ISubscriptionAPI {}

const SubscriptionItem: React.FC<ISubscriptionItemProps> = ({
  plan,
  id,
  status,
  expiry,
}) => {
  const { plan: planDetail, isLoading: planLoading } = usePlanById(plan);
  const { chargeOption, isLoading: chargeOptionLoading } =
    useChargeOption(plan);
  const [cancelSubscriptionModal, setCancelSubscription] = useToggle(false);

  const showStatus = useMemo(() => {
    if (status === "ACTIVE") {
      return checkActiveDate(expiry) ? "ACTIVE" : "EXPIRED";
    }
    return status;
  }, [status]);

  const message = useMemo(() => {
    if (showStatus === "CANCELLED") {
      return (
        <>
          {planDetail?.data.title} plan is cancelled and you can still use it
          till
          <span className="text-gray-900 ml-1">
            {dayjs(expiry).format("MMMM D, YYYY")}
          </span>
        </>
      );
    }

    return (
      <>
        {planDetail?.data.title} plan will be renewed on
        <span className="text-gray-900 ml-1">
          {dayjs(expiry).format("MMMM D, YYYY")}
        </span>
      </>
    );
  }, [showStatus, planDetail]);

  if (planLoading || chargeOptionLoading || !planDetail) {
    return null;
  }

  return (
    <OpacityTransition className=" border-b border-gray-200 last:border-0 px-2 py-3  grid gap-4 grid-cols-6 justify-center items-center text-center md:text-left">
      <div className="col-span-full  md:col-span-4 lg:col-span-3 ">
        <h3 className="text-lg  font-bold capitalize ">
          {planDetail?.data.title}
        </h3>
        <p className="text-sm  font-bold text-gray-500 mt-1">{message}</p>
      </div>

      <div className="col-span-full md:col-span-2 xl:col-span-1 ">
        <h3 className="text-base md:text-lg font-bold md:mx-auto ">
          {chargeOption && `$${parseInt(chargeOption.price)}`}

          {chargeOption && (
            <span className="text-gray-500">
              <sub className="text-sm  mr-2">
                {extractDecimalPointsFromString(chargeOption.price)}
              </sub>
              {`/${chargeOption.option_type}`}{" "}
            </span>
          )}
        </h3>
      </div>

      <div className="col-span-full lg:col-span-2 ">
        <p className=" text-base mx-auto md:mx-0 xl:mx-auto   text-secondary font-bold  border-x border-secondary w-fit px-3 py-1   ">
          {showStatus}
        </p>
      </div>

      <div className="col-span-full   ">
        {showStatus !== "CANCELLED" && (
          <button
            onClick={setCancelSubscription}
            className="font-bold  text-secondary hover:brightness-125 hover:underline"
          >
            Cancel
          </button>
        )}
      </div>

      <CustomModal
        open={cancelSubscriptionModal}
        handleClose={setCancelSubscription}
        className="!p-8 max-w-md overflow-auto"
        style={{ width: "min(550px,98%)" }}
        closeIcon
      >
        <CancelSubscription
          closeModal={setCancelSubscription}
          title={planDetail?.data.title}
          id={id}
        />
      </CustomModal>
    </OpacityTransition>
  );
};

export default SubscriptionItem;
