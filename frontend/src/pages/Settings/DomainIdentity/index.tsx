import React, { useMemo } from "react";

import {
  CircularLoader,
  CustomModal,
  PageContainer,
  PageTransitions,
  TopBar,
} from "../../../components/Common";
import { ITopBarProps } from "../../../components/Common/TopBar";
import {
  CreateDomain,
  VerifyDomain,
} from "../../../components/Settings/DomainIdentity";
import { useNavigation, useToggle } from "../../../hooks";
import { useDomainList } from "../../../services/Api/DomainIdentity/hooks";

import { useDomainIdentityStyles } from "./useDomainIdentityStyles";

const topBarProps: ITopBarProps = {
  links: [{ name: "Settings" }, { name: "Domain Verification" }],
};

function DomainIdentityPage(): React.ReactElement {
  const classes = useDomainIdentityStyles();
  const { goBack } = useNavigation();
  const [showCreateDomain, setCreateDomain] = useToggle(false);
  const { domain, isLoading, isFetching } = useDomainList(() =>
    setCreateDomain()
  );

  const modalShow = useMemo(() => {
    if (!domain && showCreateDomain) {
      return true;
    }
    return false;
  }, [domain, showCreateDomain]);

  if (isLoading || isFetching) return <CircularLoader />;

  return (
    <React.Fragment>
      <TopBar links={topBarProps.links} />
      <PageTransitions>
        <CustomModal
          open={modalShow}
          handleClose={goBack}
          closeIcon
          className={classes.modal}
          backdropClose={false}
        >
          <CreateDomain onCancel={goBack} onSuccess={setCreateDomain} />
        </CustomModal>

        {!modalShow && (
          <PageContainer
            style={{
              paddingBlock: "3em",
              maxWidth: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "1.5em",
            }}
          >
            <VerifyDomain domain={domain} />
          </PageContainer>
        )}
      </PageTransitions>
    </React.Fragment>
  );
}

export default DomainIdentityPage;
