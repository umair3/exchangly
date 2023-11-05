import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { ShowAlert } from "../../../../features/alert";
import { useEmail } from "../../../../hooks";
import { useCreateEmailIdentity } from "../../../../services/Api/EmailIdentity/hooks";

import { paths } from "../../../../services/AppRoutes/paths";
import { CustomButton, CustomInput, SimpleLoader } from "../../../Common";
import { InputElem } from "../../../Common/CustomInput";

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "1em",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    gap: "1em",

    "& h2": {
      color: "var(--secondary)",

      textShadow: "0 0  1px var(--secondary)",
      paddingBlock: "0.5em",
      borderBottom: "1px solid var(--secondary)",
      fontWeight: "bold",
      fontSize: "1.5rem",
    },
    "& h4": {
      width: "min(800px,100%)",
      lineHeight: 1.6,
      opacity: 0.7,
      fontWeight: "bold",
    },
  },
  inputContainer: {
    backgroundColor: "var(--light50)",
    boxShadow: "1px 1px 10px var(--light20)",
    padding: "2em",
    borderRadius: "1em",
    display: "flex",
    flexDirection: "column",
    gap: "0.5em",
    width: "min(600px,100%)",

    "& label": {
      opacity: 0.9,
      fontWeight: "bold",
      cursor: "pointer",
    },
  },
  buttonWrapper: {
    marginBlock: "0.5em 0.2em",
    display: "flex",
    justifyContent: "flex-end",
    gap: "0.5em",
    flexWrap: "wrap",
    alignItems: "center",
  },
});

interface ICreateEmailProps {}

interface Identity {
  first_name: string;
  last_name: string;
  email: string;
}

const CreateEmail: React.FC<ICreateEmailProps> = (props) => {
  const classes = useStyles();
  const [identity, setIdentity] = useState<Identity>({
    first_name: "",
    last_name: "",
    email: "",
  });

  const { mutate, isLoading } = useCreateEmailIdentity();
  const { validate } = useEmail();

  const onChangeInput = (event: React.ChangeEvent<InputElem>) => {
    setIdentity((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const validateIdentityFields = async () => {
    const { first_name, last_name, email } = identity;
    if (!first_name) {
      ShowAlert({ message: "First name field is required", status: "error" });
    }

    if (!last_name) {
      ShowAlert({ message: "Last name field is required", status: "error" });
    }

    const { isEmpty, isValid, error } = await validate(email);
    if (error) {
      ShowAlert({ message: error, status: "error" });
    }

    return !first_name || !last_name || isEmpty || !isValid ? false : true;
  };

  const onCreate = async () => {
    const validFields = await validateIdentityFields();
    if (validFields) {
      mutate(identity);
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.info}>
        <h2>Create Identity</h2>
        <h4>
          To verify ownership of an email address, you must have access to its
          inbox to open verification email.
        </h4>
        <h4 style={{ fontWeight: "bold" }}>Identity Details:</h4>
      </div>
      <div className={classes.inputContainer}>
        {isLoading ? (
          <div className="py-6">
            <SimpleLoader />
          </div>
        ) : (
          <>
            <label htmlFor="first_name">First Name:</label>
            <CustomInput
              id="first_name"
              type="text"
              name="first_name"
              placeholder="first name"
              onChange={onChangeInput}
            />

            <label htmlFor="last_name">Last Name:</label>
            <CustomInput
              id="last_name"
              type="text"
              name="last_name"
              placeholder="last name"
              onChange={onChangeInput}
            />

            <label htmlFor="email">Email address:</label>
            <CustomInput
              id="email"
              type="text"
              name="email"
              placeholder="example@email.com"
              onChange={onChangeInput}
            />

            <div className={classes.buttonWrapper}>
              <CustomButton
                onClick={onCreate}
                startIcon={<AiOutlineAppstoreAdd />}
              >
                Create Identity
              </CustomButton>
              <CustomButton
                startIcon={<MdClose />}
                type="link"
                href={paths.emailsIdentity}
              >
                Cancel
              </CustomButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateEmail;
