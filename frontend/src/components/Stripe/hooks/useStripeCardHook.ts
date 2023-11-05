import { StripeCardElementChangeEvent } from "@stripe/stripe-js";
import { useCallback, useEffect } from "react";
import { useAppSelector } from "../../../app/hooks";
import { ShowAlert } from "../../../features/alert";
import { ICardElement, useStripeActions } from "../../../features/stripe";

export const useStripeCardHook = (
  initialState: ICardElement = { completed: false, error: null }
): [
  ICardElement,
  (event: StripeCardElementChangeEvent) => void,
  () => boolean
] => {
  const cardInfo = useAppSelector((state) => state.stripe.cardElement);
  const { setCardElement } = useStripeActions();

  useEffect(() => {
    changeCardState(initialState);
  }, []);

  const changeCardState = (props: ICardElement) => {
    setCardElement(props);
  };

  const onInputChange = useCallback((event: StripeCardElementChangeEvent) => {
    changeCardState(initialState);
    if (event.complete) {
      changeCardState({ completed: true, error: null });
    } else if (event.error) {
      changeCardState({
        completed: false,
        error: event.error.message || "Card is invalid",
      });
    }
  }, []);

  const checkRequiredCard = () => {
    if (!cardInfo || (!cardInfo.completed && !cardInfo.error)) {
      ShowAlert({
        status: "error",
        message: "Please enter card number",
      });
      return false;
    } else if (!cardInfo.completed && cardInfo.error) {
      ShowAlert({
        status: "error",
        message: cardInfo.error,
        clear: true,
      });
      return false;
    }
    return true;
  };

  return [cardInfo ? cardInfo : initialState, onInputChange, checkRequiredCard];
};
