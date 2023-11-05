import { makeStyles } from "@mui/styles";
import { CardElement } from "@stripe/react-stripe-js";
import {
  StripeCardElementChangeEvent,
  StripeCardElementOptions,
} from "@stripe/stripe-js";
import React from "react";

const useStyles = makeStyles({
  container: {
    width: "100%",
    outlineColor: "var(--primary)",
    borderRadius: "15px",
  },
  cardContainer: {
    width: "100%",
    height: "100%",
    padding: "7px 16px",
    fontSize: "1rem",
    cursor: "pointer",
    borderRadius: "15px",
    border: "10px solid var(--light50)",
    maxWidth: "500px",
  },

  error: {
    fontWeight: 500,
    fontSize: "0.9rem",
    color: "rgba(206, 74, 126, 0.9)",
    width: "100%",
    margin: "5px",
    padding: "4px 0",
  },
});

const CARD_OPTIONS: StripeCardElementOptions = {
  iconStyle: "solid",
  hidePostalCode: true,

  style: {
    base: {
      fontWeight: 600,
      color: "#454545",

      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883",
      },
    },

    invalid: {
      iconColor: "rgba(206, 74, 126, 0.9)",
      color: "rgba(206, 74, 126, 0.9)",
    },
  },
};

interface ICustomStripeCardElement {
  error: string | null;
  onChange: (event: StripeCardElementChangeEvent) => any;
  completed: boolean;
}

const CustomStripeCardElement: React.FC<ICustomStripeCardElement> = ({
  error,
  onChange,
  completed,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div
        className={classes.cardContainer}
        style={{
          borderColor: error ? "var(--secondary50)" : "var(--light50)",
        }}
      >
        <CardElement onChange={onChange} options={CARD_OPTIONS} />
      </div>
      {error && <div className={classes.error}>{error}</div>}
    </div>
  );
};

export default CustomStripeCardElement;
