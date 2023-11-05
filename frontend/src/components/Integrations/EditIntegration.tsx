import { makeStyles } from "@mui/styles";
import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdClose } from "react-icons/md";

import { ISingleIntegrationAPI } from "../../services/Api/Integrations";
import { useEditIntegration } from "../../services/Api/Integrations/hooks";
import {
  CircularLoader,
  CustomButton,
  CustomLabelWithCheckbox,
  CustomLabelWithInput,
  ErrorMessage,
} from "../Common";
import { useAddEditIntegrationForm } from "./hooks";

const useStyles = makeStyles({
  form: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: "0.2em",
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
    marginBlock: "0.4em 1em",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    paddingInline: "3em",
    gap: "1em",
  },
});

interface IEditIntegrationProps {
  closeModal: () => void;
  integration: Omit<ISingleIntegrationAPI, "created" | "updated">;
}

const EditIntegration: React.FC<IEditIntegrationProps> = ({
  closeModal,
  integration,
}) => {
  const classes = useStyles();

  const { editIntegration, isLoading } = useEditIntegration(closeModal);

  const { handleSubmit, values, handleChange, handleBlur, errors, touched } =
    useAddEditIntegrationForm({
      initialValues: {
        title: integration.title,
        type: integration.type,
        host: integration.host,
        port: String(integration.port),
        key: integration.key,
        passphrase: integration.passphrase,
        default: integration.default,
      },
      handleValues: ({ port, ...values }) =>
        editIntegration({
          id: integration.id,
          integrationFields: { ...values, port: parseInt(port) },
        }),
    });

  return (
    <React.Fragment>
      {isLoading && <CircularLoader />}
      <form className={classes.form}>
        <h4 className={classes.header}>Edit Integration</h4>
        <CustomLabelWithInput
          label={"Title"}
          type="text"
          name="title"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {touched.title && errors.title && (
          <ErrorMessage message={errors.title} />
        )}

        <CustomLabelWithInput
          label={"Type"}
          type="text"
          name="type"
          value={values.type}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {touched.type && errors.type && <ErrorMessage message={errors.type} />}

        <CustomLabelWithInput
          label={"Host"}
          type="text"
          name="host"
          value={values.host}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {touched.host && errors.host && <ErrorMessage message={errors.host} />}

        <CustomLabelWithInput
          label={"Port"}
          type="number"
          name="port"
          value={values.port}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {touched.port && errors.port && <ErrorMessage message={errors.port} />}

        <CustomLabelWithInput
          label={"Key"}
          type="text"
          name="key"
          value={values.key}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {touched.key && errors.key && <ErrorMessage message={errors.key} />}

        <CustomLabelWithInput
          label={"Passphrase"}
          type="text"
          name="passphrase"
          value={values.passphrase}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {touched.passphrase && errors.passphrase && (
          <ErrorMessage message={errors.passphrase} />
        )}

        <div style={{ alignSelf: "start" }}>
          <CustomLabelWithCheckbox
            label="Default"
            checked={values.default}
            onChange={handleChange}
            id="default"
            value={String(values.default)}
          />
        </div>

        <div className={classes.buttonContainer}>
          <CustomButton startIcon={<AiFillEdit />} onClick={handleSubmit}>
            Edit
          </CustomButton>
          <CustomButton startIcon={<MdClose />} onClick={closeModal}>
            Cancel
          </CustomButton>
        </div>
      </form>
    </React.Fragment>
  );
};

export default EditIntegration;
