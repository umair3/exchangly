import { CustomButton, SimpleLoader } from "../../Common";
import { CustomStripeCardElement } from "../../Stripe";
import { useStripeCardHook } from "../../Stripe/hooks";
import Amex from "../../../assets/images/amex.png";
import Disc from "../../../assets/images/disc.png";
import Master from "../../../assets/images/mast.png";
import Visa from "../../../assets/images/visa.png";
import React, { useEffect } from "react";
import { useStripeActions } from "../../../features/stripe";
import { useCreatePaymentMethod } from "../../../services/Api/Billing";
import { useQueryClient } from "react-query";

interface IAddPaymentMethodProps {
  closeModal: () => void;
}

const AddPaymentMethod: React.FC<IAddPaymentMethodProps> = ({ closeModal }) => {
  const queryClient = useQueryClient();
  const [cardInfo, onChange, checkRequiredCard] = useStripeCardHook();
  const { removeCardElement } = useStripeActions();
  const { isLoading, createPaymentMethod } = useCreatePaymentMethod();

  useEffect(() => {
    return () => {
      removeCardElement();
    };
  }, []);

  const addPaymentCard = () => {
    const isCardValid = checkRequiredCard();
    if (isCardValid) {
      createPaymentMethod(() => {
        closeModal();
        queryClient.invalidateQueries("paymentMethods");
      });
    }
  };

  return (
    <div className="w-full ">
      <div className="flex justify-center">
        <h3
          className="text-xl text-primary font-bold mb-8"
          style={{ textShadow: "0px 0px 1px var(--primary)" }}
        >
          Payment Method
        </h3>
      </div>

      <div className="w-full max-w-md  flex gap-2 mx-auto px-2">
        {React.Children.toArray(
          [Amex, Disc, Master, Visa].map((src) => (
            <img src={src} alt="credit-card" title="Credit Card" />
          ))
        )}
      </div>

      <div className="w-full max-w-md mx-auto my-6">
        <CustomStripeCardElement
          completed={cardInfo.completed}
          error={cardInfo.error}
          onChange={onChange}
        />
      </div>

      {!isLoading && (
        <div className="flex flex-col md:flex-row w-full mx-auto justify-end gap-4">
          <CustomButton icon="add" onClick={addPaymentCard}>
            Add Card
          </CustomButton>
          <CustomButton icon="cancel" onClick={closeModal}>
            Cancel
          </CustomButton>
        </div>
      )}

      {isLoading && <SimpleLoader />}
    </div>
  );
};

export default AddPaymentMethod;
