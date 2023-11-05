import React from "react";
import { makeStyles } from "@mui/styles";
import { AiOutlineContacts } from "react-icons/ai";
import { CustomButton } from "../../Common";
import { paths } from "../../../services/AppRoutes/paths";
import { useNavigation } from "../../../hooks";

const useStyles = makeStyles({
  icon: {
    opacity: 0.5,
  },
  content: {
    "& h4": {
      fontSize: "1.3rem",
      fontWeight: "bold",
      lineHeight: 1.1,
    },
    "& p": {
      fontSize: "1rem",
    },
  },
  actions: {
    display: "flex",
    alignItems: "center",
    marginTop: "0.6rem",
    flexWrap: "wrap",
    gap: "0.7rem",
  },
  cancel: {
    textDecoration: "underline",
    color: "var(--secondary)",
    fontSize: "1rem",
    cursor: "pointer",
    "&:hover": {
      filter: "brightness(110%)",
    },
  },
  button: {
    fontSize: "0.8rem!important",
  },
});

interface INoContactsProps {}

const NoContacts: React.FC<INoContactsProps> = (props) => {
  const classes = useStyles();
  const { goBack } = useNavigation();

  return (
    <React.Fragment>
      <div className={classes.icon}>
        <AiOutlineContacts fontSize={"7rem"} />
      </div>
      <div className={classes.content}>
        <h4>No contacts yet?</h4>
        <p>
          You can upload a spreadsheet of contacts or import them from another
          service.
        </p>
        <p>We'll walk you through it.</p>
        <div className={classes.actions}>
          <CustomButton
            type="link"
            href={paths.importAudienceContacts}
            icon="add"
            className={classes.button}
          >
            Import Contacts
          </CustomButton>
          <div className={classes.cancel} onClick={goBack}>
            Cancel
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NoContacts;
