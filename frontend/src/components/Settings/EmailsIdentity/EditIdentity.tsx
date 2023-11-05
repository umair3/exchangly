import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { ShowAlert } from "../../../features/alert";
import { useEmail } from "../../../hooks";
import { useEditEmailIdentity } from "../../../services/Api/EmailIdentity/hooks";

import {
  CustomButton,
  CustomInput,
  CustomLabelWithCheckbox,
  SimpleLoader,
} from "../../Common";
import { InputElem } from "../../Common/CustomInput";

const useStyles = makeStyles({
  container: {
    display: "flex",
    paddingInline: "0.5em",
    flexDirection: "column",
    gap: "0.5em",
    width: "100%",
  },
  header: {
    color: "var(--primary)",
    fontSize: "1.2rem",
    textTransform: "capitalize",
    marginBottom: "1.5em",
    textShadow: "0px 0px 1px var(--primary)",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    marginBlock: "0.4em 1em",
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",

    gap: "1em",
  },
  status: {
    alignSelf: "flex-start",

    width: "100%",
    padding: "0.5em",
    marginTop: "1rem",
    borderRadius: "1em",

    fontWeight: "bold",

    "& span": {
      marginLeft: "0.4em",
    },
  },
});

interface IEditIdentityProps {
  closeModal: () => void;
  email: string;
  id: number;
  status: boolean;
  defaultValue: boolean;
  first_name: string;
  last_name: string;
}

interface Identity {
  first_name: string;
  last_name: string;
  email: string;
  default: boolean;
}

const EditIdentity: React.FC<IEditIdentityProps> = ({
  closeModal,
  email = "",
  id,
  first_name = "",
  last_name = "",
  status,
  defaultValue = false,
}) => {
  const classes = useStyles();

  const [identity, setIdentity] = useState<Identity>({
    email: email,
    default: defaultValue,
    first_name: first_name,
    last_name: last_name,
  });
  const { mutate, isLoading } = useEditEmailIdentity(() => closeModal());
  const { validate } = useEmail();

  const onChangeInput = (event: React.ChangeEvent<InputElem>) => {
    setIdentity((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onChangeDefault = (
    _event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setIdentity((prevState) => ({ ...prevState, default: checked }));
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

  const onUpdate = async () => {
    const validFields = await validateIdentityFields();

    if (
      validFields &&
      (email !== identity.email ||
        first_name !== identity.first_name ||
        last_name !== identity.last_name ||
        defaultValue !== identity.default)
    ) {
      mutate({ identityId: id, ...identity });
    }
  };

  return (
    <React.Fragment>
      <div className={classes.container}>
        {isLoading ? (
          <SimpleLoader />
        ) : (
          <>
            <h4 className={classes.header}>Edit Identity</h4>

            <label className="font-bold" htmlFor="first_name">
              First Name:
            </label>
            <CustomInput
              id="first_name"
              type="text"
              name="first_name"
              placeholder="first name"
              value={identity.first_name}
              onChange={onChangeInput}
            />

            <label className="font-bold" htmlFor="last_name">
              Last Name:
            </label>
            <CustomInput
              id="last_name"
              type="text"
              name="last_name"
              placeholder="last name"
              value={identity.last_name}
              onChange={onChangeInput}
            />

            <label className="font-bold" htmlFor="email">
              Email address:
            </label>
            <CustomInput
              id="email"
              type="text"
              name="email"
              placeholder="example@email.com"
              value={identity.email}
              onChange={onChangeInput}
            />

            <CustomLabelWithCheckbox
              name="default"
              checked={identity.default}
              onChange={onChangeDefault}
              label="Default"
            />

            <div className={`${classes.status} bg-gray-200/50`}>
              Status:
              <span className={status ? "text-primary" : "text-secondary"}>
                {status ? "Verified" : "Unverified"}
              </span>
            </div>
            <div className={classes.buttonContainer}>
              <CustomButton onClick={onUpdate} icon="add">
                Update
              </CustomButton>
              <CustomButton startIcon={<MdClose />} onClick={closeModal}>
                Cancel
              </CustomButton>
            </div>
          </>
        )}
      </div>
    </React.Fragment>
  );
};

export default EditIdentity;
