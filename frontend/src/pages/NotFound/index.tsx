import { makeStyles } from "@mui/styles";
import React from "react";
import { useNavigate } from "react-router";

import { CustomButton, PageTransitions } from "../../components/Common";
import { paths } from "../../services/AppRoutes/paths";

const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: "var(--gradient)",

    color: "var(--light)",

    fontWeight: "bold",
  },
  wrapper: {
    fontSize: "1rem",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "4em 2em",
    boxShadow: "0px 5px 6px 1px rgba(0,0,0,0.67)",
    width: "98%",
    maxWidth: "500px",
    textAlign: "center",
  },

  header: {
    fontSize: "8rem",
    textShadow: "0 8px 8px rgb(248, 248, 248)",
    color: "var(--light50)",
  },
  notFound: {
    fontSize: "2rem",
    marginBottom: "10px",
  },

  description: {
    color: "var(--light50)",
  },
  pathWrapper: {
    margin: "5px  0",
  },
  path: {
    textDecoration: "underline",
    color: "var(--primary)",
    backgroundColor: "var(--light50)",
    padding: "2px 6px",
    borderRadius: "12px",
  },

  buttonWrapper: {
    margin: "30px 0",
  },

  "@media screen and (max-width:600px)": {
    header: {
      fontSize: "5rem",
    },
    notFound: {
      fontSize: "1.6rem",
    },
    wrapper: {
      padding: "30px",
      fontSize: "0.8rem",
    },
  },
});

function NotFoundPage(): React.ReactElement {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.header}>404</div>
        <div className={classes.notFound}>Page Not Found</div>
        <div className={classes.description}>
          We're sorry the page you requested could not be found.{" "}
        </div>
        <div className={classes.pathWrapper}>
          URL pathname :{" "}
          <span className={classes.path}>{window.location.pathname}</span>
        </div>
        <div className={classes.description} style={{ marginTop: "10px" }}>
          Please go back to the homepage
        </div>

        <div className={classes.buttonWrapper}>
          <CustomButton onClick={() => navigate(paths.dashboard)}>
            Home Page
          </CustomButton>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
