import React from "react";

import {
  LogsAccordion,
  Emails,
  TopEmailCountHeader,
} from "../../../components/Campaign/ExecutionLogs";

import { useExecutionLogEmailStyles } from "../../../components/Campaign/ExecutionLogs/hooks/useExecutionLogEmailStyles";
import { PageTransitions, TopBar } from "../../../components/Common";
import { ITopBarProps } from "../../../components/Common/TopBar";
import { EnumExecutionLogStatus } from "../../../services/Api/Campaign/hooks/useExecutionLogByStatus";
import { paths } from "../../../services/AppRoutes/paths";
import { useExecutionLogsStyles } from "./useExecutionLogsStyles";

function ExecutionLogsPage(): React.ReactElement {
  const classes = useExecutionLogsStyles();
  const styles = useExecutionLogEmailStyles();

  const topBarProps: ITopBarProps = {
    links: [
      { name: "Campaign", path: paths.campaign },
      { name: "Execution Logs" },
    ],
  };

  return (
    <React.Fragment>
      <TopBar links={topBarProps.links} />
      <PageTransitions>
        <div className={classes.container}>
          <TopEmailCountHeader
            sent={15}
            delivered={10}
            opened={5}
            clicked={2}
          />

          <div className={classes.details}>
            <LogsAccordion
              expanded={true}
              title="Emails Sent"
              titleClassName={`${styles.emailsSentBackground} ${classes.paddingAndBorderRadius}`}
              iconClassName={styles.emailsSentColor}
            >
              <Emails status={EnumExecutionLogStatus.SENT} />
            </LogsAccordion>

            <LogsAccordion
              title="Emails Delivered"
              titleClassName={`${styles.emailsDeliveredBackground} ${classes.paddingAndBorderRadius}`}
              iconClassName={styles.emailsDeliveredColor}
            >
              <Emails status={EnumExecutionLogStatus.DELIVERED} />
            </LogsAccordion>
            <LogsAccordion
              title="Emails Opened/Read"
              titleClassName={`${styles.emailsOpenedBackground} ${classes.paddingAndBorderRadius}`}
              iconClassName={styles.emailsOpenedColor}
            >
              <Emails status={EnumExecutionLogStatus.OPENED} />
            </LogsAccordion>
            <LogsAccordion
              title="Link/Button Clicked"
              titleClassName={`${styles.emailsClickedBackground} ${classes.paddingAndBorderRadius}`}
              iconClassName={styles.emailsClickedColor}
            >
              <Emails status={EnumExecutionLogStatus.LINK_CLICKED} />
            </LogsAccordion>
          </div>
        </div>
      </PageTransitions>
    </React.Fragment>
  );
}

export default ExecutionLogsPage;
