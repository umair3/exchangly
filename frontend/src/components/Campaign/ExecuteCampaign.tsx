import { makeStyles } from "@mui/styles";
import React from "react";

import { GiConfirmed } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { ShowAlert } from "../../features/alert";
import { useExecuteCampaign } from "../../services/Api/Campaign/hooks";
import { CustomButton, OpacityTransition, SimpleLoader } from "../Common";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5em",
  },
  header: {
    color: "var(--primary)",
    fontSize: "1.3rem",
    width: "98%",
    textShadow: "0px 0px 1px var(--primary)",
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "capitalize",
  },
  buttonContainer: {
    display: "flex",
    gap: "1em",
    justifyContent: "end",
    flexWrap: "wrap",
    width: "100%",
  },
});

interface IExecuteCampaignProps {
  closeModal: () => void;
  title: string;
  id: number;
}

const ExecuteCampaign: React.FC<IExecuteCampaignProps> = ({
  closeModal,
  title,
  id,
}) => {
  const classes = useStyles();
  const { mutate, isLoading } = useExecuteCampaign(() => {
    closeModal();
    ShowAlert({
      message: `${title} campaign is started for execution`,
      status: "success",
    });
  });

  const onExecute = () => {
    if (id) {
      mutate(id);
    }
  };

  return (
    <React.Fragment>
      {isLoading ? (
        <SimpleLoader />
      ) : (
        <div className={classes.container}>
          <h4 className={classes.header}>Campaign:{title}</h4>
          <p
            style={{
              textShadow: "0px 0px 1px var(--primary)",
              fontSize: "1rem",
            }}
            className="py-2 px-3 bg-gray-200 rounded-lg font-bold text-secondary"
          >
            Click confirm to execute this campaign
          </p>
          <div className={classes.buttonContainer}>
            <CustomButton startIcon={<GiConfirmed />} onClick={onExecute}>
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

export default ExecuteCampaign;
