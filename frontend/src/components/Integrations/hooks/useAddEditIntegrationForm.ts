import { useFormik } from "formik";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  type: yup.string().required("Type is required"),
  host: yup.string().required("Host is required"),
  port: yup.string().required("Port is required"),
  key: yup.string().required("Key is required"),
  passphrase: yup.string().required("Passphrase is required"),
  default: yup.boolean(),
});

export interface ICreateIntegrationParamValues {
  title: string;
  type: string;
  host: string;
  port: string;
  key: string;
  passphrase: string;
  default: boolean;
}

interface IUseAddEditIntegrationForm {
  initialValues?: Partial<ICreateIntegrationParamValues>;
  handleValues: (values: ICreateIntegrationParamValues) => void;
}

export function useAddEditIntegrationForm(config: IUseAddEditIntegrationForm) {
  const { initialValues, handleValues } = config;
  const {
    title,
    type,
    host,
    port,
    key,
    passphrase,
    default: Default,
  } = initialValues || {};

  const { handleSubmit, values, handleChange, handleBlur, errors, touched } =
    useFormik<ICreateIntegrationParamValues>({
      initialValues: {
        title: title || "",
        type: type || "",
        host: host || "",
        port: port || "",
        key: key || "",
        passphrase: passphrase || "",
        default: Default || false,
      },
      validationSchema: schema,
      onSubmit: (values) => {
        handleValues(values);
      },
    });

  return { handleSubmit, values, handleChange, handleBlur, errors, touched };
}
