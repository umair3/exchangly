import React, { useMemo } from "react";
import { makeStyles } from "@mui/styles";
import { AiFillCheckCircle } from "react-icons/ai";
import { MdPending } from "react-icons/md";

const useStyles = makeStyles({
  wrapper: {
    borderBottom: "1px solid var(--light50)",
    paddingBlock: "1.5em",
    paddingInline: "1.5em",
    width: "100%",
    // maxHeight: "800px",
    border: "none",
    position: "relative",
  },
  disableWrapper: {
    opacity: 0.6,

    pointerEvents: "none",
  },
  stepper: {
    display: "flex",
    gap: "1.2rem",
    flexWrap: "wrap",
    alignItems: "center",
    width: "100%",
    position: "relative",
  },
  stepperContent: {
    width: "100%",
    marginBlock: "0.4em",

    paddingBlock: "1.2em",
    paddingInline: "1.5em",
  },

  mainTitle: {
    fontSize: "1.2rem",
    fontWeight: "bold",
  },

  icon: {
    opacity: 0.7,
    marginLeft: "auto",
  },

  placeholder: {
    opacity: 1,
    fontWeight: "bold",
    maxWidth: "min(100%,600px)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  "@media screen and (max-width:950px)": {
    stepperContent: {
      paddingInline: "0.5em!important",
    },
  },
  "@media screen and (max-width:650px)": {
    stepperContent: {
      paddingBlock: "1em",
      paddingInline: "0!important",
    },
  },
});

interface ICampaignStepperProps {
  title: string;
  placeholder: string;
  activeStep: number;
  step: number;
  value: string;
  style?: React.CSSProperties;
}

const CampaignStepper: React.FC<ICampaignStepperProps> = ({
  title,
  placeholder,
  activeStep,
  step,
  children,
  value,
  style,
}) => {
  const classes = useStyles();

  const isDisabled = useMemo(() => {
    if (activeStep >= step) {
      return false;
    }
    return true;
  }, [activeStep, step]);

  const isCompleted = useMemo(() => {
    return activeStep > step;
  }, [activeStep, step]);

  return (
    <div
      className={`${classes.wrapper} ${
        isDisabled ? classes.disableWrapper : ""
      }`}
      style={{ borderWidth: isCompleted ? "medium" : "thin", ...style }}
    >
      <div className={classes.stepper}>
        <h3 className={classes.mainTitle}>{title}:</h3>
        <div
          className={classes.placeholder}
          style={{ textShadow: isCompleted ? "2px 2px var(--darK)" : "none" }}
        >
          {isCompleted ? value : placeholder}
        </div>
        {isCompleted ? (
          <AiFillCheckCircle className={classes.icon} fontSize={"1.5rem"} />
        ) : (
          <MdPending className={classes.icon} fontSize={"1.5rem"} />
        )}
      </div>
      {activeStep === step && (
        <div className={classes.stepperContent}>{children}</div>
      )}
    </div>
  );
};

export default CampaignStepper;
