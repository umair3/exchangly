import React, { useEffect } from "react";

import { useNavigate } from "react-router";

import {
  AudienceList,
  Banner,
  StatusFilter,
  TagFilter,
} from "../../components/Audience";

import {
  CustomPagination,
  PageContainer,
  PageTransitions,
  TopBar,
} from "../../components/Common";
import { ITopBarProps } from "../../components/Common/TopBar";
import { useAudienceActions } from "../../features/audience";
import { usePagination } from "../../hooks";
import { useAudienceList } from "../../services/Api/Audience/hooks";

import { paths } from "../../services/AppRoutes/paths";
import { useAudienceStyles } from "./useAudienceStyles";

const topBarProps: ITopBarProps = {
  links: [{ name: "Audience Dashboard", path: paths.audience }],
};

function AudiencePage(): React.ReactElement {
  const navigate = useNavigate();
  const classes = useAudienceStyles();
  const { resetAudienceState } = useAudienceActions();
  const {
    currentPage,
    changeCurrentPage,
    totalPages,
    changeCount,
    resetPagination,
  } = usePagination({
    count: 10,
    pageToShow: 1,
  });

  const { list } = useAudienceList(currentPage, (response) =>
    changeCount(response.data.count)
  );

  const onAddContacts = () => navigate(paths.importAudienceContacts);

  useEffect(() => {
    return () => {
      resetAudienceState();
    };
  }, []);

  return (
    <React.Fragment>
      <TopBar links={topBarProps.links} />
      <PageTransitions>
        <Banner
          header="Grow your marketing audience"
          description="Your audience is where you'll store and manage your contacts. Once you add your contacts, you'll be able to send your first campaign. We'll walk you through the process"
          buttonText="Add your contacts"
          onClick={onAddContacts}
        />

        <PageContainer className={classes.container}>
          <h3 className={classes.headerText}>Audience List</h3>

          <div className="my-8 px-2 flex flex-col  gap-4 md:flex-row items-center md:gap-8">
            <StatusFilter resetPagination={resetPagination} />
            <TagFilter resetPagination={resetPagination} />
          </div>

          <AudienceList audienceList={list} />

          <div className={classes.paginationContainer}>
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

export default AudiencePage;
