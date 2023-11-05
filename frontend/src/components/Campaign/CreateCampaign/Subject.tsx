import { makeStyles } from "@mui/styles";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { useAppSelector } from "../../../app/hooks";
import { useCampaignActions } from "../../../features/campaign";

import {
  CustomButton,
  CustomInput,
  ErrorMessage,
  OpacityTransition,
} from "../../Common";

const useStyles = makeStyles({
  container: {
    width: "min(600px,100%)",
    paddingInline: "2.5em",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    fontWeight: "lighter",
  },
  subject: {
    width: "100%",
  },
  para: {
    fontSize: "0.8rem",
    fontWeight: "bold",
    marginTop: "0.2rem",
    opacity: 0.9,
    "& span": {
      color: "var(--secondary)",
      marginInline: "0.2rem",
    },
  },
  previewText: {
    width: "100%",
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
    textDecoration: "underline",
    fontWeight: "bold",
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
  errorContainer: {
    marginBlock: "0.5em",
    transition: "all 300ms ease",
  },
  "@media screen and (max-width:650px)": {
    container: {
      paddingInline: "1.2em!important",
    },
  },
});

const schema = yup.object().shape({
  subject: yup
    .string()
    .max(150, "Max characters allowed for subject line is 150")
    .required("Subject is required"),
  previewText: yup
    .string()
    .min(3, "Preview Text is too short (atleast 5)")
    .max(150, "Max characters allowed 150")
    .required("Preview Text is required"),
});

interface IFormParams {
  subject: string;
  previewText: string;
}

interface ISubjectProps {
  nextStep: () => void;
  prevStep: () => void;
}

const Subject: React.FC<ISubjectProps> = ({ nextStep, prevStep }) => {
  const classes = useStyles();
  const { updateSubjectAndPreviewText } = useCampaignActions();
  const { subject, previewText } = useAppSelector(
    (state) => state.campaign.createCampaign
  );

  const { handleSubmit, values, handleChange, handleBlur, errors, touched } =
    useFormik<IFormParams>({
      initialValues: {
        subject: subject,
        previewText: previewText,
      },
      validationSchema: schema,
      onSubmit: (values) => {
        onContinue(values);
      },
    });

  const onContinue = (values: IFormParams) => {
    updateSubjectAndPreviewText({
      subject: values.subject,
      previewText: values.previewText,
    });

    nextStep();
  };

  return (
    <OpacityTransition className={classes.container}>
      <div className={classes.subject}>
        <label htmlFor="subject" className={classes.label}>
          Subject
          <span>150 characters</span>
        </label>
        <CustomInput
          id="subject"
          type="text"
          name="subject"
          value={values.subject}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <p className={classes.para}>
          See how your <span>recent subject lines</span>performed.
          <span>View our subject line guide</span>
        </p>
        <div className={classes.errorContainer}>
          {touched.subject && errors.subject && (
            <ErrorMessage message={errors.subject} />
          )}
        </div>
      </div>

      <div className={classes.previewText}>
        <label htmlFor="previewText" className={classes.label}>
          Preview Text
          <span>150 characters</span>
        </label>
        <CustomInput
          id="previewText"
          type="text"
          name="previewText"
          value={values.previewText}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <p className={classes.para}>
          <span>Preview Text</span>appears in the inbox after the subject line
        </p>
        <div className={classes.errorContainer}>
          {touched.previewText && errors.previewText && (
            <ErrorMessage message={errors.previewText} />
          )}
        </div>
      </div>
      <div className={classes.actions}>
        <CustomButton className={classes.button} onClick={handleSubmit}>
          Continue
        </CustomButton>
        <div className={classes.cancel} onClick={prevStep}>
          Back
        </div>
      </div>
    </OpacityTransition>
  );
};

export default React.memo(Subject);
