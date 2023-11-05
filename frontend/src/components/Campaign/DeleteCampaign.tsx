import { makeStyles } from "@mui/styles";
import React from "react";

import { GiConfirmed } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { ShowAlert } from "../../features/alert";
import { useDeleteCampaign } from "../../services/Api/Campaign/hooks";
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

interface IDeleteCampaignProps {
  closeModal: () => void;
  title: string;
  id: number;
}

const DeleteCampaign: React.FC<IDeleteCampaignProps> = ({
  closeModal,
  title,
  id,
}) => {
  const classes = useStyles();
  const { mutate, isLoading } = useDeleteCampaign(() => {
    closeModal();
    ShowAlert({
      message: `${title} is deleted successfully`,
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
        <div className={classes.container}>
          <h4 className={classes.header}>
            Are you sure you want to delete this campaign?
            <span style={{ textShadow: "none", marginLeft: ".2rem" }}>
              ({title})
            </span>
          </h4>
          <div className={classes.buttonContainer}>
            <CustomButton startIcon={<GiConfirmed />} onClick={onDelete}>
              Confirm
            </CustomButton>

            <CustomButton startIcon={<MdClose />} onClick={closeModal}>
              Cancel
            </CustomButton>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default DeleteCampaign;
