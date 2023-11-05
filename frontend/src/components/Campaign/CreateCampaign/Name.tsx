import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { ShowAlert } from "../../../features/alert";
import { useCampaignActions } from "../../../features/campaign";

import { useToggle } from "../../../hooks";
import { CustomInput } from "../../Common";

const useStyles = makeStyles({
  nameContainer: {
    minHeight: "100px",
    width: "min(95%,70rem)",
    marginInline: "auto",
    marginBlock: "2rem 0",

    fontSize: "1.7rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.2em",
    "& h4": {
      padding: "0.3em 0",
      fontWeight: "bold",
    },
    "& p": {
      fontSize: "1rem",
      color: "var(--secondary)",
      width: "max-content",

      "&:hover": {
        cursor: "pointer",
      },
    },
  },

  input: {
    fontSize: "1.3rem!important",
    color: "var(--dark)",
    width: "min(450px,100%)",
    borderRadius: "2em",
    padding: "0.3em 0.6em",
    opacity: 1,
  },
  label: {
    fontSize: "1rem",
    paddingInline: "0.3em 0",
    color: "var(--secondary)",
    fontWeight: "bold",
    "&:hover": {
      cursor: "pointer",
    },
  },
});

interface INameProps {}

const Name: React.FC<INameProps> = () => {
  const classes = useStyles();
  const [edit, toggleEdit] = useToggle(false);
  const title = useAppSelector((state) => state.campaign.createCampaign.title);
  const [name, setName] = useState<string>(title);
  const { updateTitle } = useCampaignActions();

  const onChangeInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setName(event.target.value);
  };

  const onChangeClick = () => {
    if (!name || name.length <= 3) {
      ShowAlert({
        message: "Please add title for campaign",
        status: "error",
      });
      return;
    }
    updateTitle(name);
    toggleEdit();
  };

  return (
    <div className={classes.nameContainer}>
      {edit ? (
        <>
          <CustomInput
            type="text"
            value={name}
            onChange={onChangeInput}
            className={classes.input}
          />
          <label className={classes.label} onClick={onChangeClick}>
            Change
          </label>
        </>
      ) : (
        <>
          <h4>{name}</h4>
          <p className="font-bold" onClick={toggleEdit}>
            Edit name
          </p>
        </>
      )}
    </div>
  );
};

export default Name;
