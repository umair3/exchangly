import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

export function usePaymentProcessing() {
  const stripe = useStripe();
  const elements = useElements();

  const callPaymentAPI = (clientSecret: string) => {
    if (stripe && elements) {
      const cardElement = elements.getElement(CardElement);

      if (cardElement) {
        return stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
          },
        });
      }
    }
  };
  return { processPayment: callPaymentAPI };
}
