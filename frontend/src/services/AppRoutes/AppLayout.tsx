import { makeStyles } from "@mui/styles";
import React from "react";
import { Outlet } from "react-router-dom";

import { CustomAlert, Sidebar } from "../../components/Common";

const useStyles = makeStyles({
  main: {
    marginLeft: "5rem",
    minHeight: "100vh",
    overflow: "auto",
  },

  "@media only screen and (max-width: 600px)": {
    main: {
      margin: 0,
      marginBottom: "5rem",
    },
  },
});

interface IAppLayoutProps {}

const AppLayout: React.FC<IAppLayoutProps> = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Sidebar />
      <main className={classes.main}>
        <Outlet />
      </main>
      <CustomAlert />
    </React.Fragment>
  );
};

export default AppLayout;
