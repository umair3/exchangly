import { makeStyles } from "@mui/styles";
import React from "react";
import { GiConfirmed } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { CustomButton, OpacityTransition } from "../../Common";

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

interface IDeleteTeamMemberProps {
  closeModal: () => void;
  id: number;
  name: string;
}

const DeleteTeamMember: React.FC<IDeleteTeamMemberProps> = ({
  closeModal,
  name,
  id,
}) => {
  const classes = useStyles();

  const onDelete = () => {};

  return (
    <React.Fragment>
      <OpacityTransition className={classes.container}>
        <h4 className={classes.header}>
          Are you sure you want to delete this member
          <span className="block">({name})</span>
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
    </React.Fragment>
  );
};

export default DeleteTeamMember;
