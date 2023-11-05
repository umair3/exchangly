import { makeStyles } from "@mui/styles";
import React from "react";

import { useAppDispatch } from "../../app/hooks";
import { useLogout } from "../../services/Api/User/hooks";
import { CustomButton, LinearLoader } from "../Common";

const useStyles = makeStyles({
  container: {
    textAlign: "center",
    margin: "5px 0",
    height: "100%",
    minHeight: "220px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: "1.7vmax",

    color: "var(--primary)",

    letterSpacing: "1px",
    textShadow: "0px 0px 1px var(--primary)",
    fontWeight: "bold",
  },
  description: {
    fontSize: "1.2rem",
    margin: "15px 0",
    maxWidth: "80%",
    fontWeight: 600,
    color: "var(--secondary)",
  },
  buttonContainer: {
    margin: "15px 5px 0",
    width: "20%",
  },

  "@media screen and (max-width:600px)": {
    container: {
      minWidth: "200px",
    },
    title: {
      fontSize: "max(1.2rem,3vmax)",
    },
    description: {
      maxWidth: "100%",
      margin: "10px 0",
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    buttonContainer: {
      width: "100%",
    },
  },
});

interface IPendingMessage {}

const PendingMessage: React.FunctionComponent<IPendingMessage> = (props) => {
  const classses = useStyles();
  const { logout, loading } = useLogout();

  return (
    <React.Fragment>
      {loading && <LinearLoader />}
      <div className={classses.container}>
        <h2 className={classses.title}>Payment Status:</h2>
        <p className={classses.description}>
          Your payment is in pending state... Please contact support
        </p>

        <div className={classses.buttonContainer}>
          <CustomButton onClick={logout}>Logout</CustomButton>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PendingMessage;
