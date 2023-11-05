import React from "react";
import { PageTransitions } from "../../../components/Common";
import TopBar, { ITopBarProps } from "../../../components/Common/TopBar";
import {
  ConnectedList,
  SocialConnections,
} from "../../../components/Settings/SocialIntegrations";

const topBarProps: ITopBarProps = {
  links: [{ name: "Settings" }, { name: "Social Integrations" }],
};

function SocialIntegrationsPage(): React.ReactElement {
  return (
    <React.Fragment>
      <TopBar links={topBarProps.links} />
      <PageTransitions>
        <div className="max-w-[86rem] px-2 xs:px-4 md:px-0 mx-auto py-14 flex flex-col gap-4">
          <h2
            className="text-2xl font-bold text-secondary pb-4 border-b border-secondary"
            style={{ textShadow: "0px 0px 1px var(--secondary)" }}
          >
            Social Integrations
          </h2>

          <div className="mt-4 w-full flex flex-col gap-2">
            <SocialConnections />
            <div className="mt-4">
              <ConnectedList />
            </div>
          </div>
        </div>
      </PageTransitions>
    </React.Fragment>
  );
}

export default SocialIntegrationsPage;
