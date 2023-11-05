import React from "react";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router-dom";
import { EmailsSkeleton, SingleLog } from ".";
import {
  EnumExecutionLogStatus,
  useExecutionLogByStatus,
} from "../../../services/Api/Campaign/hooks/useExecutionLogByStatus";

const useStyles = makeStyles({
  container: {
    width: "100%",
    padding: "0.5em 2em",
  },
});

interface IEmailsProps {
  status: EnumExecutionLogStatus;
}

const Emails: React.FC<IEmailsProps> = ({ status }) => {
  const classes = useStyles();
  const { executionId } = useParams();

  const { isLoading, isFetching, list } = useExecutionLogByStatus(
    status,
    executionId!
  );

  return (
    <div style={{ minHeight: "90px", height: "auto" }}>
      {isLoading || (isFetching && <EmailsSkeleton />)}
      <div className={classes.container}>
        {React.Children.toArray(list.map((log) => <SingleLog log={log} />))}
      </div>
    </div>
  );
};

export default Emails;
