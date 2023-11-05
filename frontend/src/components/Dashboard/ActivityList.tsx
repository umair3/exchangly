import { makeStyles } from "@mui/styles";
import React from "react";
import { useActivities } from "../../services/Api/Activity/hooks";

import ActivityItem from "./ActivityItem";
import { useAppSelector } from "../../app/hooks";
import { changeStatusToReadableString } from "../../utils";
import { OpacityTransition, SimpleLoader } from "../Common";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "0.8em",
    paddingInline: "0.2em",
  },
});

export interface IActivityListProps {}

const ActivityList: React.FC<IActivityListProps> = (props) => {
  const classes = useStyles();

  const { data, isFetchingNextPage, isLoading, module } = useActivities();
  const profile = useAppSelector((state) => state.user.profile);
  const filterBy = useAppSelector((state) => state.activity.filterBy);

  return (
    <div className={classes.container}>
      {isLoading && !isFetchingNextPage && <SimpleLoader />}

      {data?.pages.map((page, index) => {
        if (!page?.data.results.length) {
          return filterBy.value ? (
            <OpacityTransition
              className="text-md text-center font-bold p-8 bg-gray-50/80 rounded-md md:text-left"
              key={index}
            >
              No results found for given filter
              <span className="ml-1 block text-center text-secondary md:inline mt-2 md:mt-0 md:text-left ">
                {changeStatusToReadableString(module)} :(
              </span>
            </OpacityTransition>
          ) : null;
        }

        return page?.data.results.map((activity) => (
          <ActivityItem
            key={activity.id}
            email={profile?.email || ""}
            {...activity}
          />
        ));
      })}

      {isFetchingNextPage && <SimpleLoader />}
    </div>
  );
};

export default ActivityList;
