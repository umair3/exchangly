import React from "react";

import {
  CustomPagination,
  PageContainer,
  PageTransitions,
  TopBar,
} from "../../../components/Common";
import { ITopBarProps } from "../../../components/Common/TopBar";
import { EmailsIdentityList } from "../../../components/Settings/EmailsIdentity";
import { usePagination } from "../../../hooks";
import { useEmailIdentities } from "../../../services/Api/EmailIdentity/hooks";
import { paths } from "../../../services/AppRoutes/paths";
import { useEmailsIdentityStyles } from "./useEmailsIdentityStyles";

const topBarProps: ITopBarProps = {
  links: [{ name: "Settings" }, { name: "Configuration: Email identities" }],
};

function EmailsIdentityPage(): React.ReactElement {
  const classes = useEmailsIdentityStyles();

  const { currentPage, changeCurrentPage, totalPages, changeCount } =
    usePagination({
      count: 10,
      pageToShow: 1,
    });

  const { identities } = useEmailIdentities({
    currentPage,
    cb: (count) => changeCount(count),
  });

  return (
    <React.Fragment>
      <TopBar links={topBarProps.links} />
      <PageTransitions>
        <PageContainer className={`${classes.container} !pr-0 lg:!pr-20 `}>
          <div className={classes.info}>
            <h2>Email Identities</h2>
            <h4>
              A verified email identity is an email address you use to send
              email through Mails Marketing.
            </h4>
          </div>
          <EmailsIdentityList identities={identities} />
          <div className="my-4 w-full flex justify-center items-center p-2">
            <CustomPagination
              totalPages={totalPages}
              currentPage={currentPage}
              onChange={(e, page) => changeCurrentPage(page)}
            />
          </div>
        </PageContainer>
      </PageTransitions>
    </React.Fragment>
  );
}

export default EmailsIdentityPage;
