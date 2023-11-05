import React from "react";
import { makeStyles } from "@mui/styles";
import { AiOutlineMail } from "react-icons/ai";
import { CustomButton } from "../../Common";
import { paths } from "../../../services/AppRoutes/paths";
import { useNavigate } from "react-router-dom";
import { useNavigation } from "../../../hooks";

const useStyles = makeStyles({
  icon: {
    opacity: 0.5,
    alignSelf: "flex-start",
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

interface INoEmailsFoundProps {}

const NoEmailsFound: React.FC<INoEmailsFoundProps> = (props) => {
  const classes = useStyles();
  const { goBack } = useNavigation();

  return (
    <React.Fragment>
      <div className={classes.icon}>
        <AiOutlineMail fontSize={"7rem"} />
      </div>
      <div className={classes.content}>
        <h4>No email identities found :(</h4>
        <p>Please click the button below to create one.</p>

        <div className={classes.actions}>
          <CustomButton
            type="link"
            href={paths.createEmailIdentity}
            icon="add"
            className={classes.button}
          >
            Create Email Identity
          </CustomButton>
          <div className={classes.cancel} onClick={goBack}>
            Cancel
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NoEmailsFound;
