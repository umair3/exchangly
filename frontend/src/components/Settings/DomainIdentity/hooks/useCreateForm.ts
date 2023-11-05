import { useFormik } from "formik";

import * as yup from "yup";

const schema = yup.object().shape({
  domain: yup
    .string()
    .matches(
      /^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/,
      "Please specify valid domain"
    )
    .required("Domain is required"),
});

export interface ICreateDomain {
  domain: string;
}

interface IUseCreateParams {
  initialDomain?: string;
  handleValues: (values: ICreateDomain) => void;
}

export function useCreateForm({
  handleValues,
  initialDomain = "",
}: IUseCreateParams) {
  const { handleSubmit, values, handleChange, handleBlur, errors, touched } =
    useFormik<ICreateDomain>({
      initialValues: {
        domain: initialDomain,
      },
      validationSchema: schema,
      onSubmit: (values) => {
        handleValues(values);
      },
    });

  return { handleSubmit, values, handleChange, handleBlur, errors, touched };
}
