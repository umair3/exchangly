import { makeStyles } from "@mui/styles";
import React from "react";

import {
  CustomPagination,
  PageContainer,
  PageTransitions,
  TopBar,
} from "../../components/Common";
import { ITopBarProps } from "../../components/Common/TopBar";
import { Header, IntegrationsList } from "../../components/Integrations";

import { usePagination } from "../../hooks";
import { useGetIntegrationList } from "../../services/Api/Integrations/hooks";

import { paths } from "../../services/AppRoutes/paths";

const useStyles = makeStyles({
  paginationContainer: {
    width: "100%",
    marginBlock: "2em",
    display: "flex",
    justifyContent: "center",
  },
});

const topBarProps: ITopBarProps = {
  links: [{ name: "Integrations", path: paths.integrations }],
};

function IntegrationsPage(): React.ReactElement {
  const classes = useStyles();

  const { currentPage, changeCurrentPage, totalPages, changeCount } =
    usePagination({
      count: 10,
      pageToShow: 1,
    });

  const { list } = useGetIntegrationList({
    currentPage,
    cb: (count) => changeCount(count),
  });

  return (
    <React.Fragment>
      <TopBar links={topBarProps.links} />
      <PageTransitions>
        <Header />

        <PageContainer style={{ margin: "2vmin auto" }}>
          <IntegrationsList integrations={list} />

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

export default IntegrationsPage;
