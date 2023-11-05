import React from "react";
import {
  PageContainer,
  PageTransitions,
  TopBar,
} from "../../../components/Common";
import { CreateTemplate } from "../../../components/Templates/AddTemplate";
import { paths } from "../../../services/AppRoutes/paths";

const links = [
  { name: "Templates", path: paths.templates },
  { name: "Create Template" },
];

function AddTemplatePage(): React.ReactElement {
  return (
    <React.Fragment>
      <TopBar links={links} />
      <PageTransitions>
        <PageContainer
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5em",
            paddingBlock: "3em",
          }}
        >
          <CreateTemplate />
        </PageContainer>
      </PageTransitions>
    </React.Fragment>
  );
}

export default AddTemplatePage;
