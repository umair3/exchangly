import { makeStyles } from "@mui/styles";
import React from "react";

import { GiConfirmed } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { ShowAlert } from "../../features/alert";
import { useDeleteContact } from "../../services/Api/Audience/hooks";
import { CustomButton, OpacityTransition, SimpleLoader } from "../Common";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5em",
  },
  header: {
    color: "var(--primary)",
    fontSize: "1.2rem",
    width: "98%",
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

interface IDeleteAudienceProps {
  closeModal: () => void;
  email: string;
  id: number;
}

const DeleteAudience: React.FC<IDeleteAudienceProps> = ({
  closeModal,
  email,
  id,
}) => {
  const classes = useStyles();
  const { mutate, isLoading } = useDeleteContact(() => {
    closeModal();
    ShowAlert({
      message: `${email} is deleted successfully`,
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
      {isLoading ? (
        <OpacityTransition>
          <SimpleLoader />
        </OpacityTransition>
      ) : (
        <OpacityTransition className={classes.container}>
          <h4 className={classes.header}>
            Are you sure you want to delete this contact?
            <span style={{ textShadow: "none" }}>({email})</span>
          </h4>
          <div className={classes.buttonContainer}>
            <CustomButton startIcon={<GiConfirmed />} onClick={onDelete}>
              Confirm
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

export default DeleteAudience;
