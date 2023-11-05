import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import {
  PageContainer,
  PageTransitions,
  TopBar,
} from "../../../components/Common";
import { EditTemplate } from "../../../components/Templates/EditTemplate";

import { paths } from "../../../services/AppRoutes/paths";

function EditTemplatePage(): React.ReactElement {
  const templateDetail = useAppSelector(
    (state) => state.template.selectedForDetail
  );

  if (!templateDetail) return <Navigate to={paths.templates} />;

  const { subject, description, body, id } = templateDetail;

  return (
    <React.Fragment>
      <TopBar
        links={[
          { name: "Templates", path: paths.templates },
          { name: "Edit template" },
          { name: subject },
        ]}
      />
      <PageTransitions>
        <PageContainer
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5em",
            paddingBlock: "3em",
          }}
        >
          <EditTemplate
            title={subject}
            description={description}
            template={body}
            id={id}
          />
        </PageContainer>
      </PageTransitions>
    </React.Fragment>
  );
}

export default EditTemplatePage;
