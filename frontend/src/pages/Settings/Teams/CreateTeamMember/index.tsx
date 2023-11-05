import React from "react";
import { PageContainer, PageTransitions } from "../../../../components/Common";
import TopBar, { ITopBarProps } from "../../../../components/Common/TopBar";
import { CreateTeam } from "../../../../components/Settings/Teams/CreateTeamMember";
import { paths } from "../../../../services/AppRoutes/paths";

const topBarProps: ITopBarProps = {
  links: [
    { name: "Settings" },
    { name: "Teams", path: paths.teams },
    { name: "Create Team" },
  ],
};

function CreateTeamPage(): React.ReactElement {
  return (
    <React.Fragment>
      <TopBar links={topBarProps.links} />
      <PageTransitions>
        <PageContainer
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5em",
            paddingBlock: "3em",
          }}
        >
          <div className="mt-4">
            <CreateTeam />
          </div>
        </PageContainer>
      </PageTransitions>
    </React.Fragment>
  );
}

export default CreateTeamPage;
