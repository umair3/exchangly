import { makeStyles } from "@mui/styles";
import React from "react";
import { GiConfirmed } from "react-icons/gi";
import { MdClose } from "react-icons/md";

import { useDeleteIntegration } from "../../services/Api/Integrations/hooks";
import { CircularLoader, CustomButton } from "../Common";

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
    paddingInline: "1.2em",
  },
});

interface IDeleteIntegrationProps {
  title: string;
  id: number;
  closeModal: () => void;
}

const DeleteIntegration: React.FC<IDeleteIntegrationProps> = ({
  title,
  id,
  closeModal,
}) => {
  const classes = useStyles();
  const { deleteIntegration, isLoading } = useDeleteIntegration(
    closeModal,
    title
  );

  const onConfirm = () => deleteIntegration(id);

  return (
    <React.Fragment>
      {isLoading && <CircularLoader />}
      <div className={classes.container}>
        <h4 className={classes.header}>
          Are you sure you want to delete this integration?
        </h4>
        <div className={classes.buttonContainer}>
          <CustomButton startIcon={<GiConfirmed />} onClick={onConfirm}>
            Confirm
          </CustomButton>
          <CustomButton startIcon={<MdClose />} onClick={closeModal}>
            Cancel
          </CustomButton>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DeleteIntegration;
