import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { makeStyles } from "@mui/styles";
import millify from "millify";
import { IPricingPlanAPI } from "../../services/Api/Billing";
import { IAddonAction, useAddons, usePrice, useSelectPlan } from "./hooks";
import { useChargeOption } from "../../services/Api/Billing";
import AddonItem from "./AddonItem";
import { IAddonWithChargeOption } from "../../features/billing";
import { extractDecimalPointsFromString } from "../../utils";

const useStyles = makeStyles({
  container: {
    border: "2px solid var(--light50)",
    boxShadow: "-1px 0px 5px -1px var(--light20)",
    outline: "none",
    zIndex: 1,
    borderRadius: "0.5em",
    transition: "all 0.3s  ease-in-out",

    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "0.2em",
    paddingBlock: "0 5rem",
    color: "var(--dark)",
    maxWidth: "350px",
  },

  header: {
    position: "relative",

    borderRadius: ".5em",
    paddingBlock: "2.5em 1em",
    paddingInline: "1.2em",

    display: "flex",
    flexDirection: "column",
    gap: "0.2em",

    "&:after": {
      content: "''",
      position: "absolute",
      inset: 0,
      background: "var(--light50)",

      zIndex: -1,
    },
  },
  tag: {
    position: "absolute",
    top: "-1rem",
    left: 0,
    right: 0,
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  tagText: {
    backgroundColor: "var(--secondary)",
    color: "var(--light)",
    padding: "0.3em 0.5em",
    borderRadius: "0.2em",
    boxShadow: "2px 2px -1px var(--secondary)",
    textAlign: "center",
  },
  content: {
    padding: "1em 1.2em",
    display: "flex",
    flexDirection: "column",
    gap: "0.2em",
    minHeight: "240px",
  },
  title: {
    textAlign: "center",
    fontSize: "1.2rem",

    fontWeight: "bold",
  },
  contentDescription: {
    marginBlock: "1rem 0.5rem",
    fontSize: "1rem",
    textAlign: "center",
    minHeight: "100px",
  },
  price: {
    marginBlock: "0.2rem",
    display: "flex",
    justifyContent: "center",

    fontWeight: "bold",
  },
  priceSymbol: {
    fontSize: "2rem",
  },
  actualPrice: {
    fontSize: "2rem",
  },
  typePrice: {
    fontSize: "1.2rem",
    alignSelf: "flex-end",
  },
  features: {
    marginBlock: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    textAlign: "center",
  },
  lineThrough: {
    textDecoration: "line-through",
    opacity: 0.8,
  },
  buttonWrapper: {
    position: "absolute",
    right: 0,
    left: 0,
    bottom: "1rem",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  button: {
    border: "none",
    outline: "none",
    padding: "0.7em",
    textTransform: "capitalize",
    borderRadius: "0.5em",
    backgroundColor: "var(--secondary)",
    color: "var(--light)",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  disableButton: {
    opacity: 0.5,

    pointerEvents: "none",
  },
  addonsContainer: {
    margin: " 0.3em 1em",
    padding: "1em 0.5em",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "1em",

    "&::before": {
      content: "''",
      position: "absolute",
      inset: 0,
      backgroundColor: "var(--light50)",
      borderRadius: ".5em",
      zIndex: -1,
      opacity: 0.6,
    },
  },
  addonTitle: {
    fontWeight: "bold",
    opacity: 0.8,
  },
  notActivePlan: {
    "&:hover": {
      backgroundColor: "var(--secondary)",
      color: "var(--light)",
      opacity: 1,

      transform: "scale(1.1)",
      zIndex: 20,

      borderColor: "var(--light20)",

      "& $header::after": {
        backgroundColor: "var(--primary)",
        opacity: 0.3,
      },

      "& $button": {
        backgroundColor: "var(--light)",
        color: "var(--dark)",
        fontWeight: "bold",
      },

      "& $recommendedText": {
        backgroundColor: "var(--light)",
        color: "var(--secondary)",
        fontWeight: "bold",
      },

      "& $addonsContainer": {
        "&::before": {
          backgroundColor: "var(--primary)",
          opacity: 0.3,
        },
      },
    },
  },
  activePlan: {
    backgroundColor: "var(--secondary)",
    color: "var(--light)",
    opacity: 1,
    borderRadius: "0.5em",
    zIndex: 20,

    borderColor: "var(--light20)",

    "& $header::after": {
      backgroundColor: "var(--primary)",
      opacity: 0.3,
    },

    "& $button": {
      backgroundColor: "var(--light)",
      color: "var(--dark)",
      fontWeight: "bold",
    },

    "& $recommendedText": {
      backgroundColor: "var(--light)",
      color: "var(--secondary)",
      fontWeight: "bold",
    },

    "& $addonsContainer": {
      "&::before": {
        backgroundColor: "var(--primary)",
        opacity: 0.3,
      },
    },
  },
});

interface IPlanItemProps {
  plan: IPricingPlanAPI;
}

const PlanItem: React.FC<IPlanItemProps> = ({ plan }) => {
  const classes = useStyles();
  const { isLoading, chargeOption } = useChargeOption(plan.id);
  const { price, addPrice, removePrice, setPriceValue } = usePrice();
  const {
    selectedPlan,
    changeSelectedOption,
    addAddonForPlan,
    removeAddonForPlan,
  } = useSelectPlan();
  const selectPlanFirstTime = useRef<boolean>(true);

  const { addons, changeAddon } = useAddons(
    (addon: IAddonWithChargeOption, action: IAddonAction) => {
      if (activePlan && action === "add") {
        addAddonForPlan(addon);
        return;
      }
      if (activePlan && action === "remove") {
        removeAddonForPlan(addon);
        return;
      }
    }
  );

  const addActivePrice = useCallback(() => {
    if (chargeOption && selectedPlan) {
      const price = parseFloat(chargeOption.price);

      const totalPrice = selectedPlan.addons.reduce(
        (prevValue, nextValue) => prevValue + nextValue.price,
        price
      );

      setPriceValue(totalPrice);
    }
  }, [chargeOption, selectedPlan]);

  useEffect(() => {
    if (chargeOption && activePlan) {
      {
        addActivePrice();
        return;
      }
    }
    if (chargeOption && !activePlan) {
      setPriceValue(parseFloat(chargeOption.price));
      return;
    }
  }, [chargeOption]);

  useEffect(() => {
    if (selectedPlan) {
      selectPlanFirstTime.current = false;
      return;
    }

    if (
      plan.ui_json?.showCurrentPlan &&
      chargeOption &&
      !selectedPlan &&
      selectPlanFirstTime.current
    ) {
      selectPlan();
      selectPlanFirstTime.current = false;
      return;
    }
  }, [selectedPlan, chargeOption]);

  const selectPlan = useCallback(() => {
    if (chargeOption) {
      changeSelectedOption({
        planId: plan.id,
        planName: plan.title,
        chargeOptionId: chargeOption.id,
        contacts: plan.ui_json?.contacts,
        emails: plan.ui_json?.emails,
        price: chargeOption?.price,
        addons,
      });
    }
  }, [chargeOption, addons]);

  const addLineClass = useCallback((value: boolean) => {
    return value ? " " : classes.lineThrough;
  }, []);

  const activePlan = useMemo(() => {
    if (selectedPlan && selectedPlan.planId === plan.id) {
      return true;
    }
    return false;
  }, [selectedPlan]);

  const activePlanClass = useMemo(() => {
    const defaultClass = classes.notActivePlan;

    if (activePlan) {
      return classes.activePlan;
    }
    return defaultClass;
  }, [activePlan]);

  return (
    <div className={`${classes.container} ${activePlanClass}`}>
      {plan?.tag && (
        <div className={classes.tag}>
          <div className={classes.tagText}>{plan.tag}</div>
        </div>
      )}
      <div className={classes.header}>
        <div className={classes.title}>{plan.title}</div>
        <div className={classes.contentDescription}>{plan.desc}</div>
      </div>

      <div className={classes.content}>
        {!isLoading && chargeOption && typeof price === "number" && (
          <div className={classes.price}>
            <span className={classes.priceSymbol}>$</span>
            <span className={classes.actualPrice}>
              {parseInt(String(price))}

              <sub className="mr-2">
                {extractDecimalPointsFromString(String(price))}
              </sub>
            </span>
            {chargeOption && parseInt(chargeOption.price) !== 0 && (
              <span className={classes.typePrice}>/month</span>
            )}
          </div>
        )}

        <div className={classes.features}>
          {typeof plan?.ui_json?.NoDailySendingLimit !== "undefined" && (
            <p className={addLineClass(plan.ui_json.NoDailySendingLimit)}>
              No Daily Sending Limit
            </p>
          )}

          {typeof plan?.ui_json?.emailSupport !== "undefined" && (
            <p className={addLineClass(plan.ui_json.emailSupport)}>
              Email Support
            </p>
          )}

          {typeof plan?.ui_json?.phoneSupport !== "undefined" && (
            <p className={addLineClass(plan.ui_json.phoneSupport)}>
              Phone Support
            </p>
          )}

          {plan.ui_json.contacts && (
            <p>With {millify(plan.ui_json.contacts)} contacts</p>
          )}

          {plan.ui_json.emails && (
            <p>Upto {millify(plan.ui_json.emails)} emails/month</p>
          )}

          {plan.ui_json.additional && <p>{plan.ui_json.additional}</p>}
        </div>
      </div>
      {plan.addons.length ? (
        <div className={classes.addonsContainer}>
          <div className={classes.addonTitle}>Addons &#8594;</div>
          {React.Children.toArray(
            plan.addons.map((addon) => {
              return (
                <AddonItem
                  planId={plan.id}
                  id={addon.id}
                  title={addon.title}
                  description={addon.desc}
                  addPrice={addPrice}
                  removePrice={removePrice}
                  changeAddon={changeAddon}
                />
              );
            })
          )}
        </div>
      ) : null}
      <div className={classes.buttonWrapper}>
        <button
          className={`${classes.button} ${activePlan && classes.disableButton}`}
          onClick={selectPlan}
        >
          {activePlan ? "Plan Selected" : "Get Started"}
        </button>
      </div>
    </div>
  );
};

export default PlanItem;
