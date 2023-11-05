import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import { useAppSelector } from "../../../../app/hooks";
import { useFetchOnScroll } from "../../../../hooks/useFetchOnScroll";
import { ActivityService } from "../Activity";
import { IActivitiesAPIResponseAPI } from "../types";

export function useActivities() {
  const module = useAppSelector((state) => state.activity.filterBy.value);
  const perPage = 10;
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery<IActivitiesAPIResponseAPI>(
      ["activities", module],
      ({ pageParam = 1 }) =>
        ActivityService.getActivities({ page: pageParam.toString(), module }),
      {
        refetchOnWindowFocus: false,
        getNextPageParam: (lastPage, allPages) => {
          const maxPages = lastPage.data.count / perPage;
          const nextPage = allPages.length + 1;
          return nextPage <= maxPages ? nextPage : undefined;
        },
      }
    );

  const fetchNextPageActivities = async () => {
    if (hasNextPage) {
      await fetchNextPage();
    }
  };

  useFetchOnScroll({ fetchCall: fetchNextPageActivities });

  return { data, isLoading, isFetchingNextPage, hasNextPage, module };
}
