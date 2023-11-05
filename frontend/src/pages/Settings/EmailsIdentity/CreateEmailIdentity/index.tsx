import React from "react";

import {
  PageContainer,
  PageTransitions,
  TopBar,
} from "../../../../components/Common";
import { ITopBarProps } from "../../../../components/Common/TopBar";
import { CreateEmail } from "../../../../components/Settings/EmailsIdentity/CreateEmailIdentity";
import { paths } from "../../../../services/AppRoutes/paths";

const topBarProps: ITopBarProps = {
  links: [
    { name: "Settings", path: paths.emailsIdentity },
    { name: "Configuration: Email identities", path: paths.emailsIdentity },
    {
      name: "Create Email Identity",
    },
  ],
};

function CreateEmailIdentityPage(): React.ReactElement {
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
          <CreateEmail />
        </PageContainer>
      </PageTransitions>
    </React.Fragment>
  );
}

export default CreateEmailIdentityPage;
