import React, { useCallback, useEffect } from "react";
import { MdOutlineTimeline } from "react-icons/md";
import {
  OpacityTransition,
  PageContainer,
  PageTransitions,
  SimpleLoader,
  TopBar,
} from "../../components/Common";
import { ITopBarProps } from "../../components/Common/TopBar";
import { paths } from "../../services/AppRoutes/paths";
import {
  LoadMoreTimelines,
  SearchUserTimeline,
  Timeline,
} from "../../components/UserJourney";
import useUserJourneyStyles from "./useUserJourneyStyles";

import { useUserJourneyActions } from "../../features/userJourney";
import { useAppSelector } from "../../app/hooks";
import { useUserTimeline } from "../../services/Api/UserJourney/hooks/useUserTimeline";
import { usePagination } from "../../hooks";

const topBarProps: ITopBarProps = {
  links: [{ name: "User Journey", path: paths.userJourney }],
};

function UserJourneyPage(): React.ReactElement {
  const classes = useUserJourneyStyles();
  const { resetJourneyState, setSearchEmail } = useUserJourneyActions();
  const email = useAppSelector((state) => state.userJourney.searchEmail);

  const { changeCount, currentPage, changeCurrentPage, resetPagination } =
    usePagination({
      count: 10,
      pageToShow: 1,
    });

  const { isLoading, isFetching, nextPage, userTimelines } = useUserTimeline({
    email,
    currentPage,
    callback: (response) => {
      changeCount(response.data.count);
    },
  });

  const handleSearch = useCallback((value: string) => {
    resetPagination();
    setSearchEmail(value);
  }, []);

  const loadMore = useCallback(() => {
    changeCurrentPage(currentPage + 1);
  }, [currentPage]);

  useEffect(() => {
    return () => {
      resetJourneyState();
    };
  }, []);

  return (
    <React.Fragment>
      <TopBar links={topBarProps.links} />
      <PageTransitions>
        <PageContainer style={{ marginTop: "2rem" }}>
          <div className={classes.header}>
            <h2>Timeline</h2>
            <MdOutlineTimeline fontSize={"1.5rem"} />
          </div>
          <SearchUserTimeline value={email} handleSearch={handleSearch} />

          {email &&
            !isLoading &&
            !isFetching &&
            Array.isArray(userTimelines) &&
            userTimelines.length === 0 && (
              <OpacityTransition>
                <div className="p-6 bg-gray-50/50 rounded text-center font-bold">
                  No timeline is found with this email
                  <span className="text-secondary mx-2">{email} :(</span>
                </div>
              </OpacityTransition>
            )}

          {Boolean(userTimelines.length) &&
            userTimelines.map(({ date, events }) => {
              return <Timeline date={date} events={events} key={date} />;
            })}

          {(isLoading || isFetching) && <SimpleLoader />}

          {!isLoading && !isFetching && nextPage && (
            <LoadMoreTimelines loadMore={loadMore} />
          )}
        </PageContainer>
      </PageTransitions>
    </React.Fragment>
  );
}

export default UserJourneyPage;
