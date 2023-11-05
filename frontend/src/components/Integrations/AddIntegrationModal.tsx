import React from "react";
import { makeStyles } from "@mui/styles";
import AddIntegration from "./AddIntegration";
import { CustomModal } from "../Common";

const useStyles = makeStyles({
  modal: {
    padding: "2em 2em",
    minWidth: "min(450px,98%)",

    overflow: "auto",
  },
});

interface IAddIntegrationModalProps {
  handleClose: () => void;
  open: boolean;
}

const AddIntegrationModal: React.FC<IAddIntegrationModalProps> = ({
  handleClose,
  open,
}) => {
  const classes = useStyles();

  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
      className={classes.modal}
      closeIcon
    >
      <AddIntegration closeModal={handleClose} />
    </CustomModal>
  );
};

export default AddIntegrationModal;
