import { makeStyles } from "@mui/styles";

import React from "react";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { useCreateDomain } from "../../../services/Api/DomainIdentity/hooks";

import {
  CircularLoader,
  CustomButton,
  CustomLabelWithInput,
  ErrorMessage,
} from "../../Common";
import { useCreateForm } from "./hooks";

const useStyles = makeStyles({
  form: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: "1em",
    width: "100%",
  },
  header: {
    color: "var(--primary)",
    fontSize: "1.2rem",
    textTransform: "capitalize",
    marginBottom: "0.5em",
    textShadow: "0px 0px 1px var(--primary)",
    fontWeight: "bold",
  },
  description: {
    textAlign: "center",
    color: "var(--secondary)",
    backgroundColor: "var(--secondary50)",
    padding: "1em",
    borderRadius: "1em",
    fontWeight: "bold",
  },
  buttonContainer: {
    marginBlock: "0.4em 1em",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    paddingInline: "3em",
    gap: "1em",
  },
});

interface ICreateDomainProps {
  onCancel: () => void;
  onSuccess: () => void;
}

const CreateDomain: React.FC<ICreateDomainProps> = ({
  onCancel,
  onSuccess,
}) => {
  const classes = useStyles();
  const { mutate, isLoading } = useCreateDomain(onSuccess);
  const { handleSubmit, values, handleChange, handleBlur, errors, touched } =
    useCreateForm({ handleValues: ({ domain }) => mutate(domain) });
  return (
    <form className={classes.form}>
      {isLoading && <CircularLoader />}

      <h4 className={classes.header}>Create Domain</h4>
      <h5 className={classes.description}>
        To verify ownership of a domain, you must have access to its DNS
        settings to add the necessary records.
      </h5>

      <CustomLabelWithInput
        label={"Domain"}
        type="text"
        name="domain"
        value={values.domain}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="example.com"
      />

      {touched.domain && errors.domain && (
        <ErrorMessage message={errors.domain} />
      )}
      <div className={classes.buttonContainer}>
        <CustomButton
          onClick={handleSubmit}
          startIcon={<AiOutlineAppstoreAdd />}
        >
          Add
        </CustomButton>
        <CustomButton startIcon={<MdClose />} onClick={onCancel}>
          Cancel
        </CustomButton>
      </div>
    </form>
  );
};

export default CreateDomain;
