import { makeStyles } from "@mui/styles";
import * as React from "react";

import { useAppSelector } from "../../app/hooks";

const useStyles = makeStyles({
  container: {
    fontSize: "1rem",
    lineHeight: "24px",
    border: "1px solid var(--light50)",
    width: "min(300px,100%)",
    borderRadius: "0.5em",

    color: "var(--dark)",

    "&::before": {
      content: "''",
      position: "absolute",
      inset: 0,
      backgroundColor: "var(--light50)",
      zIndex: -1,
      opacity: 0.5,
    },
  },
  sticky: { position: "sticky", top: "5rem" },
  title: {
    width: "100%",

    padding: "24px",
    borderRadius: "0.5em",
    backgroundColor: "var(--secondary)",
    color: "var(--light)",
  },

  summaryTitle: {
    fontWeight: 400,
    fontSize: "1.4rem",
  },
  billingCurrencyInfo: {
    fontSize: "0.9rem",
    fontWeight: 200,
    wordSpacing: "1px",
  },

  currency: {
    color: "var(--light50)",
    fontWeight: "bold",
  },
  planContainer: {
    width: "100%",
    padding: "18px",
  },
  fieldValue: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: 900,
    fontSize: "1rem",
    lineHeight: "28px",
  },

  detail: {
    lineHeight: "24px",
    fontSize: "0.9rem",
    fontWeight: 300,
    wordSpacing: "1px",
    marginBottom: "14px",
  },
  estimatedTotal: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: 600,
    fontSize: "1rem",
    lineHeight: "28px",
    margin: "20px 0",
    padding: "18px 0",
    position: "relative",
    borderTop: "1px solid #DBD9D2",
    borderBottom: "1px solid #DBD9D2",
  },
  disclaimer: {
    fontSize: "0.9rem",
    backgroundColor: "var(--light50)",
    padding: "0.5em",
    fontWeight: 300,
    color: "var(--secondary)",
    marginBlock: ".5rem",
  },
  learMore: {
    color: "var(--secondary)",
    display: "block",
    cursor: "pointer",
  },
  buttonContainer: {
    marginTop: "20px",
  },
  addons: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5em",
  },
  addon: {
    display: "flex",
    justifyContent: "space-between",

    fontWeight: 900,

    fontSize: "1rem",
    lineHeight: "28px",
  },
});

export interface IPurchaseSummaryProps {
  children: (props: ReturnType<typeof useStyles>) => JSX.Element;
  isSticky?: boolean;
}

const PurchaseSummary: React.FC<IPurchaseSummaryProps> = ({
  children,
  isSticky = false,
}) => {
  const classes = useStyles();
  const selectedPlan = useAppSelector((state) => state.billing.selectedPlan);

  if (!selectedPlan) {
    return null;
  }

  return (
    <div className={`${classes.container} ${isSticky && classes.sticky} `}>
      <div className={classes.title}>
        <h3 className={classes.summaryTitle}>Purchase Summary</h3>
        <div className={classes.billingCurrencyInfo}>
          Billed in <span className={classes.currency}>US Dollars</span>
        </div>
      </div>

      <div className={classes.planContainer}>
        <div className={classes.fieldValue}>
          <div className="name">{selectedPlan.planName}</div>
          {selectedPlan.price && parseFloat(selectedPlan.price) > 0 && (
            <div className="price">${parseFloat(selectedPlan.price)}</div>
          )}
        </div>
        <div className={classes.detail}>
          {selectedPlan.contacts && (
            <p className="info">
              {selectedPlan.contacts.toLocaleString()} contacts*
            </p>
          )}
          {selectedPlan.emails && (
            <p className="info">
              {selectedPlan.emails.toLocaleString()} emails*
            </p>
          )}
        </div>

        <div className={classes.addons}>
          {selectedPlan.addons.length
            ? selectedPlan.addons.map((addon) => {
                return (
                  <div className={classes.addon} key={addon.id}>
                    <div>{addon.title}</div>
                    <div>${addon.price}</div>
                  </div>
                );
              })
            : null}
        </div>

        {children(classes)}
      </div>
    </div>
  );
};

export default PurchaseSummary;
