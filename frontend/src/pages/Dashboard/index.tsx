import React, { useEffect } from "react";
import { MdOutlineFeed } from "react-icons/md";
import { useAppSelector } from "../../app/hooks";

import {
  PageContainer,
  PageTransitions,
  TopBar,
} from "../../components/Common";
import { ITopBarProps } from "../../components/Common/TopBar";
import {
  ActivitySection,
  AudienceSection,
  UserMessage,
} from "../../components/Dashboard";

import { useActivityActions } from "../../features/activity";
import { paths } from "../../services/AppRoutes/paths";
import useDashboardStyles from "./useDashboardStyles";

const topBarProps: ITopBarProps = {
  links: [{ name: "Dashboard", path: paths.dashboard }],
};

function DashboardPage(): React.ReactElement {
  const { classes } = useDashboardStyles();
  const profile = useAppSelector((state) => state.user.profile);
  const { setInitialActivityState } = useActivityActions();

  useEffect(() => {
    return () => {
      setInitialActivityState();
    };
  }, []);

  return (
    <React.Fragment>
      <TopBar links={topBarProps.links} />
      <PageTransitions>
        <PageContainer style={{ margin: "5vmin auto" }}>
          <UserMessage username={profile?.email || ""} />
          <div className={classes.mainSection}>
            <div className={classes.activity}>
              <ActivitySection />
            </div>
            <div className={classes.audience}>
              <AudienceSection />
            </div>
          </div>

          <div className={classes.endFeed}>
            <h4 className={classes.typography}>
              You have reached the end of the feed!
            </h4>
            <MdOutlineFeed className={classes.icon} fontSize={"2rem"} />
          </div>
        </PageContainer>
      </PageTransitions>
    </React.Fragment>
  );
}

export default DashboardPage;
