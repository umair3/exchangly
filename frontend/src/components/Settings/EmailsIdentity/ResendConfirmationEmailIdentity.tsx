import { makeStyles } from "@mui/styles";
import React from "react";
import { MdClose } from "react-icons/md";
import { RiMailSendLine } from "react-icons/ri";
import { ShowAlert } from "../../../features/alert";
import { useSendVerificationLink } from "../../../services/Api/EmailIdentity/hooks";

import { CustomButton, SimpleLoader } from "../../Common";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",

    gap: "1em",
  },
  header: {
    color: "var(--primary)",
    fontSize: "1.2rem",
    width: "95%",
    display: "flex",
    flexDirection: "column",
    gap: "0.2em",
    justifyContent: "center",
    textShadow: "0px 0px 1px var(--primary)",
    fontWeight: "bold",
  },
  buttonContainer: {
    display: "flex",
    gap: "1em",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    width: "100%",
  },
});

interface IResendConfirmationEmailIdentityProps {
  closeModal: () => void;
  email: string;
  id: number;
}

const ResendConfirmationEmailIdentity: React.FC<
  IResendConfirmationEmailIdentityProps
> = ({ closeModal, email, id }) => {
  const classes = useStyles();
  const { mutate, isLoading } = useSendVerificationLink(() => {
    closeModal();
    ShowAlert({
      message:
        "Email is sent to your mailbox..please verify your email address",
      status: "success",
    });
  });

  const onSend = () => {
    if (id) {
      mutate(email);
    }
  };

  return (
    <React.Fragment>
      <div className={classes.container}>
        {isLoading ? (
          <SimpleLoader />
        ) : (
          <>
            <h4 className={classes.header}>
              <span> Send Verification Link to</span>
              <span className="mt-2 bg-gray-200/50 text-secondary p-2 rounded-lg">
                {email}
              </span>
            </h4>
            <div className={classes.buttonContainer}>
              <CustomButton onClick={onSend} startIcon={<RiMailSendLine />}>
                Send
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

export default ResendConfirmationEmailIdentity;
