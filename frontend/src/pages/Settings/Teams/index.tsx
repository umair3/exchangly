import React from "react";
import { PageTransitions } from "../../../components/Common";
import TopBar, { ITopBarProps } from "../../../components/Common/TopBar";
import { RolesSection, TeamsSection } from "../../../components/Settings/Teams";

const topBarProps: ITopBarProps = {
  links: [{ name: "Settings" }, { name: "Teams" }],
};

function TeamsPage(): React.ReactElement {
  return (
    <React.Fragment>
      <TopBar links={topBarProps.links} />
      <PageTransitions>
        <div className="max-w-[86rem] px-2 xs:px-4 md:px-0 mx-auto py-14 flex flex-col gap-4">
          <h2
            className="text-2xl font-bold text-secondary pb-4 border-b border-secondary"
            style={{ textShadow: "0px 0px 1px var(--secondary)" }}
          >
            Manage Teams
          </h2>
          <TeamsSection />
          <div className="mt-2">
            <RolesSection />
          </div>
        </div>
      </PageTransitions>
    </React.Fragment>
  );
}

export default TeamsPage;
