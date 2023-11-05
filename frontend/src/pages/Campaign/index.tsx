import React, { useEffect } from "react";
import { HeroSectionCampaign, View } from "../../components/Campaign";
import {
  PageContainer,
  PageTransitions,
  TopBar,
} from "../../components/Common";
import { ITopBarProps } from "../../components/Common/TopBar";
import { useCampaignActions } from "../../features/campaign";
import { paths } from "../../services/AppRoutes/paths";
import useCampaignStyles from "./useCampaignStyles";

const topBarProps: ITopBarProps = {
  links: [{ name: "Campaign Dashboard", path: paths.campaign }],
};

function CampaignPage(): React.ReactElement {
  const classes = useCampaignStyles();
  const { resetCampaignState } = useCampaignActions();

  useEffect(() => {
    return () => {
      resetCampaignState();
    };
  }, []);

  return (
    <React.Fragment>
      <TopBar links={topBarProps.links} />
      <PageTransitions>
        <HeroSectionCampaign
          title="Start your campaign now"
          description="Your email campaign is where you send emails and address your target audience. Once you've run a campaign, you can see your audience's reaction. We'll stroll you thru the process."
        />

        <div className="my-2">
          <PageContainer marginAuto={true} className={classes.container}>
            <View />
          </PageContainer>
        </div>
      </PageTransitions>
    </React.Fragment>
  );
}

export default CampaignPage;
