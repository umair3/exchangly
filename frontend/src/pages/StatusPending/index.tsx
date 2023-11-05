import React from "react";
import { makeStyles } from "@mui/styles";

import {
  CustomModal,
  PageTransitions,
  TitleHeader,
} from "../../components/Common";
import { PendingMessage } from "../../components/StatusPending";
import { useToggle } from "../../hooks";

const useStyles = makeStyles({
  modal: {
    padding: "1em 0",
    minWidth: "min(300px,98%)",

    top: "30%",
  },
});

function StatusPendingPage(): React.ReactElement {
  const [open] = useToggle(true);
  const classes = useStyles();
  return (
    <React.Fragment>
      <TitleHeader title="Billing" subtitle="Payment" />
      <PageTransitions>
        <CustomModal open={open} className={classes.modal}>
          <PendingMessage />
        </CustomModal>
      </PageTransitions>
    </React.Fragment>
  );
}

export default StatusPendingPage;
