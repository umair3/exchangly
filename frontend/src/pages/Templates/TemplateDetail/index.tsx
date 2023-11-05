import React from "react";

import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { PageTransitions, TopBar } from "../../../components/Common";

import {
  TemplateBody,
  TemplateHeader,
} from "../../../components/Templates/TemplateDetail";

import { paths } from "../../../services/AppRoutes/paths";

function TemplateDetail(): React.ReactElement {
  const templateDetail = useAppSelector(
    (state) => state.template.selectedForDetail
  );

  if (!templateDetail) return <Navigate to={paths.templates} />;

  const {
    subject,
    description,
    body,
    created,
    updated,
    thumbnail,
    user_defined,
    id,
  } = templateDetail;

  return (
    <React.Fragment>
      <TopBar
        links={[
          { name: "Templates", path: paths.templates },
          { name: subject },
        ]}
      />
      <PageTransitions>
        <TemplateHeader
          created={created}
          updated={updated}
          subject={subject}
          thumbnail={thumbnail}
          description={description}
          body={body}
          id={id}
          user_defined={user_defined}
        />

        <TemplateBody body={body} />
      </PageTransitions>
    </React.Fragment>
  );
}

export default TemplateDetail;
