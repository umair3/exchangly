import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import Select from "react-select";
import * as yup from "yup";

import { MdClose } from "react-icons/md";

import {
  CustomButton,
  CustomInput,
  OpacityTransition,
  SimpleLoader,
} from "../Common";
import { ISelectAudience } from "./AudienceList";
import { AUDIENCE_STATUS } from "../../constants/AudienceStatus";
import { ILabelValue } from "../Common/CustomSelect";
import { useReactSelect, useReactSelectStyles } from "../../hooks";
import { InputElem } from "../Common/CustomInput";
import { useEditContact } from "../../services/Api/Audience/hooks";
import { ShowAlert } from "../../features/alert";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "0.8em",
  },
  header: {
    color: "var(--primary)",
    fontSize: "1.2rem",
    width: "98%",
    textShadow: "0px 0px 1px var(--primary)",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    display: "flex",

    gap: "1em",
    flexDirection: "column",

    width: "100%",
    maxWidth: "250px",
    margin: "10px auto",
  },
});

const options: { label: string; value: string }[] = [
  { label: AUDIENCE_STATUS.SUBSCRIBED, value: AUDIENCE_STATUS.SUBSCRIBED },
  { label: AUDIENCE_STATUS.PROSPECTS, value: AUDIENCE_STATUS.PROSPECTS },
];

const schema = yup.object().shape({
  email: yup
    .string()

    .email("Please enter valid email"),
});

interface IEditAudienceProps {
  closeModal: () => void;

  contact: ISelectAudience;
}

const EditAudience: React.FC<IEditAudienceProps> = ({
  closeModal,
  contact,
}) => {
  const classes = useStyles();
  const styles = useReactSelectStyles<ILabelValue, false>();

  const { email: prevEmail, id, status: prevStatus } = contact;
  const { value, onChangeValue } = useReactSelect(prevStatus);
  const [emailValue, setEmail] = useState<string>(prevEmail);

  const onChangeEmail = (event: React.ChangeEvent<InputElem>) => {
    setEmail(event.target.value);
  };

  const { mutate, isLoading } = useEditContact(() => {
    closeModal();
    ShowAlert({
      message: `Contact no: ${id} is updated successfully`,
      status: "success",
    });
  });

  const onEdit = () => {
    const { label, value: status } = value || {};

    if (!status) {
      ShowAlert({
        message: "Status is required",
        status: "error",
        clear: true,
      });
    }

    if (!emailValue) {
      ShowAlert({
        message: "Email is required",
        status: "error",
      });
    }

    if (emailValue) {
      schema
        .validate({ email: emailValue })
        .then((data) => {
          const { email } = data;
          if (
            status &&
            email &&
            (prevStatus !== status || prevEmail !== email)
          ) {
            mutate({ updateId: id, email, status });
          }
        })
        .catch((error) => {
          ShowAlert({
            message: error.errors[0],
            status: "error",
          });
        });
    }
  };

  return (
    <React.Fragment>
      {isLoading ? (
        <OpacityTransition>
          <SimpleLoader />
        </OpacityTransition>
      ) : (
        <OpacityTransition className={classes.container}>
          <h4 className={classes.header}>Edit Contact</h4>
          <div>
            <label htmlFor="email" className="text-gray-600 font-bold ml-1">
              Email
            </label>
            <CustomInput
              name="email"
              value={emailValue}
              type="text"
              className="!rounded-sm placeholder:font-bold  "
              placeholder="Email for contact..."
              onChange={onChangeEmail}
            />
          </div>

          <div>
            <label htmlFor="status" className="text-gray-600 font-bold ml-1">
              Status
            </label>
            <Select
              defaultValue={value}
              name="status"
              options={options}
              placeholder="Please choose status..."
              styles={styles}
              isClearable
              onChange={onChangeValue}
            />
          </div>

          <div className={classes.buttonContainer}>
            <CustomButton startIcon={<AiFillEdit />} onClick={onEdit}>
              Edit
            </CustomButton>

            <CustomButton startIcon={<MdClose />} onClick={closeModal}>
              Cancel
            </CustomButton>
          </div>
        </OpacityTransition>
      )}
    </React.Fragment>
  );
};

export default EditAudience;
