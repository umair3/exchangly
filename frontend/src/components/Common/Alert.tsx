import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@mui/styles";
import React from "react";

import { useAppSelector } from "../../app/hooks";

const useStyles = makeStyles({
  container: {
    position: "fixed",
    bottom: "1%",
    right: "1%",
    width: "auto",
    minWidth: "min(300px,100%)",
    maxWidth: "min(500px,100%)",

    zIndex: 2100,
  },

  root: {
    boxShadow: "0px 7px 5px 4px rgba(0,0,0,0.2) !important",
    borderRadius: "10px!important",
    fontSize: "0.9rem!important",

    transition: "all 0.3s ease-in-out",
  },
  message: {
    whiteSpace: "pre-wrap",
    overflow: "hidden",
    textOverflow: "ellipsis!important",
  },

  error: {
    color: "var(--light)!important",
    backgroundColor: "var(--secondary)!important",
  },
  success: {
    color: "var(--light)!important",
    backgroundColor: "var(--primary)!important",
  },
  icon: {
    color: "var(--light)!important",
  },
});

interface IAlertProps {}

const CustomAlert: React.FC<IAlertProps> = (props) => {
  const alerts = useAppSelector((state) => state.alerts);
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Stack sx={{ width: "100%" }} spacing={2}>
        {React.Children.toArray(
          alerts.map(({ status, message }) => (
            <Alert
              severity={status}
              classes={{
                root: classes.root,
                standardSuccess: classes.success,
                standardError: classes.error,
                icon: classes.icon,
                message: classes.message,
              }}
            >
              {message}
            </Alert>
          ))
        )}
      </Stack>
    </div>
  );
};

export default CustomAlert;
