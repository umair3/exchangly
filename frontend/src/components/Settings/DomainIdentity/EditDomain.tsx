import { makeStyles } from "@mui/styles";
import React from "react";
import { useUpdateDomain } from "../../../services/Api/DomainIdentity/hooks";

import {
  CustomButton,
  CustomLabelWithInput,
  ErrorMessage,
  SimpleLoader,
} from "../../Common";
import { useCreateForm } from "./hooks";

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "1em",
    alignItems: "center",
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
  buttonContainer: {
    marginBlock: "0.5em",
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    gap: "0.5em",
  },
});

interface IEditDomainProps {
  closeModal: () => void;
  id: number;
  domain: string;
}

const EditDomain: React.FC<IEditDomainProps> = ({ closeModal, id, domain }) => {
  const classes = useStyles();
  const { mutate, isLoading } = useUpdateDomain(closeModal);

  const { handleSubmit, values, handleChange, handleBlur, errors, touched } =
    useCreateForm({
      initialDomain: domain,
      handleValues: ({ domain }) => mutate(domain),
    });

  if (isLoading) {
    return <SimpleLoader />;
  }

  return (
    <div className={classes.wrapper}>
      <h4 className={classes.header}>Edit Domain</h4>

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
        <CustomButton icon="add" onClick={handleSubmit}>
          Update
        </CustomButton>
        <CustomButton icon="cancel" onClick={closeModal}>
          Cancel
        </CustomButton>
      </div>
    </div>
  );
};

export default EditDomain;
