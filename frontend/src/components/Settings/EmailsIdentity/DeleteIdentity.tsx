import { makeStyles } from "@mui/styles";
import React from "react";
import { GiConfirmed } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { ShowAlert } from "../../../features/alert";
import { useDeleteIdentity } from "../../../services/Api/EmailIdentity/hooks";

import { CustomButton, SimpleLoader } from "../../Common";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5em",
  },
  header: {
    color: "var(--primary)",
    fontSize: "1.2rem",
    width: "95%",
    textShadow: "0px 0px 1px var(--primary)",
    fontWeight: "bold",
  },
  buttonContainer: {
    display: "flex",
    gap: "1em",
    flexWrap: "wrap",
    width: "100%",
  },
});

interface IDeleteIdentityProps {
  closeModal: () => void;
  email: string;
  id: number;
}

const DeleteIdentity: React.FC<IDeleteIdentityProps> = ({
  closeModal,
  email,
  id,
}) => {
  const classes = useStyles();
  const { mutate, isLoading } = useDeleteIdentity(() => {
    closeModal();
    ShowAlert({
      message: `${email} is delete successfully`,
      status: "success",
    });
  });

  const onDelete = () => {
    if (id) {
      mutate(id);
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
              Are you sure you want to delete this Identity?
              <span style={{ textShadow: "none" }}>({email})</span>
            </h4>
            <div className={classes.buttonContainer}>
              <CustomButton onClick={onDelete} startIcon={<GiConfirmed />}>
                Confirm
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

export default DeleteIdentity;
