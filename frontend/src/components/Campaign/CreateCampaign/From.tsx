import { makeStyles } from "@mui/styles";
import React, { useMemo, useState } from "react";

import { ShowAlert } from "../../../features/alert";
import { useCampaignActions } from "../../../features/campaign";
import { IEmailIdentityAPI } from "../../../services/Api/EmailIdentity";

import {
  CustomButton,
  CustomInput,
  CustomSelect,
  OpacityTransition,
} from "../../Common";
import NoEmailsFound from "./NoEmailsFound";

const useStyles = makeStyles({
  container: {
    width: "min(600px,100%)",

    paddingInline: "2.5em",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "1rem",
    fontWeight: "lighter",
  },

  email: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "0.3em",
  },
  label: {
    display: "flex",
    fontWeight: "bold",

    "& span": {
      marginLeft: "auto",
      fontSize: "0.8rem",
    },
  },
  actions: {
    display: "flex",
    alignItems: "center",

    flexWrap: "wrap",
    gap: "0.7rem",
    width: "100%",
  },
  cancel: {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "var(--secondary)",
    fontSize: "0.9rem",
    cursor: "pointer",
    "&:hover": {
      filter: "brightness(110%)",
    },
  },
  button: {
    fontSize: "0.8rem!important",
  },
  "@media screen and (max-width:650px)": {
    container: {
      paddingInline: "1.2em!important",
    },
  },
});

interface IFromProps {
  nextStep: () => void;
  prevStep: () => void;
  emailsList: IEmailIdentityAPI[];
  senderEmail: string;
}

const From: React.FC<IFromProps> = ({
  nextStep,
  prevStep,
  emailsList,
  senderEmail,
}) => {
  const classes = useStyles();

  const [email, setEmail] = useState(senderEmail);
  const { updateSenderEmail } = useCampaignActions();

  const onChangeEmail = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEmail(event.target.value);
  };

  const mapOptions = useMemo(() => {
    return emailsList.map((item) => ({
      label: `${item.email} (${item.first_name})`,
      value: item.email,
    }));
  }, [emailsList]);

  const onContinue = () => {
    if (!email) {
      ShowAlert({ message: "Email is required", status: "error" });
      return;
    }
    updateSenderEmail(email);
    nextStep();
  };

  return (
    <OpacityTransition className={classes.container}>
      {!emailsList.length ? (
        <NoEmailsFound />
      ) : (
        <React.Fragment>
          <div className={classes.email}>
            <label htmlFor="email" className={classes.label}>
              Email
            </label>
            <CustomSelect
              value={email}
              onChange={onChangeEmail}
              defaultLabelWithValue={{
                label: "Please choose email address",
                value: "",
              }}
              optionsWithLabels={mapOptions}
            />
            <p className="text-[12.8px]  font-bold">
              Note: Select email with a
              <span className="text-secondary mx-1">verified identity</span>
            </p>
          </div>
          <div className={classes.actions}>
            <CustomButton onClick={onContinue} className={classes.button}>
              Continue
            </CustomButton>
            <div className={classes.cancel} onClick={prevStep}>
              Back
            </div>
          </div>
        </React.Fragment>
      )}
    </OpacityTransition>
  );
};

export default React.memo(From);
