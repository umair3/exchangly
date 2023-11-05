import { makeStyles } from "@mui/styles";
import React from "react";

import Amex from "../../assets/images/amex.png";
import Disc from "../../assets/images/disc.png";
import Master from "../../assets/images/mast.png";
import Visa from "../../assets/images/visa.png";
import { CustomStripeCardElement } from "../Stripe";
import { useStripeCardHook } from "../Stripe/hooks";

const useStyles = makeStyles({
  container: {
    minWidth: "100%",
  },
  header: {
    fontSize: "1rem",
    fontWeight: 600,
    opacity: 0.7,
    marginBottom: "10px",
    marginTop: "8px",
  },
  cardsContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "160px",
    margin: "15px 0",
  },
});

interface IPaymentCardDetailProps {
  header?: string;
}

const PaymentCardDetail: React.FC<IPaymentCardDetailProps> = ({
  header = "Credit Card",
}) => {
  const classes = useStyles();

  const [cardInfo, onChange] = useStripeCardHook();

  return (
    <div className={classes.container}>
      <div className={classes.header}>{header}</div>
      <div className={classes.cardsContainer}>
        {React.Children.toArray(
          [Amex, Disc, Master, Visa].map((src) => (
            <img src={src} alt="credit-card" title="Credit Card" />
          ))
        )}
      </div>

      <CustomStripeCardElement
        completed={cardInfo.completed}
        error={cardInfo.error}
        onChange={onChange}
      />
    </div>
  );
};

export default PaymentCardDetail;
