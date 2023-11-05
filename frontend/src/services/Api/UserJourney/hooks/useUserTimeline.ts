import { useMemo, useRef, useState } from "react";
import { useQuery } from "react-query";
import { ShowAlert } from "../../../../features/alert";
import { IUserTimelineAPI, IUserTimelineAPIResponse } from "../types";
import { UserJourneyService } from "../UserJourney";

interface IUseUserTimelineParams {
  currentPage: number;
  email: string;
  callback?: (data: IUserTimelineAPIResponse) => void;
}

interface IUserTimeline {
  date: string;
  events: IUserTimelineAPI[];
}

export function useUserTimeline({
  currentPage,
  callback,
  email,
}: IUseUserTimelineParams) {
  const [timelinesData, setTimelinesData] = useState<IUserTimelineAPI[]>([]);
  const [nextPage, setNextPage] = useState<null | string>(null);
  const prevEmail = useRef<string>("");

  const { isLoading, isFetching } = useQuery(
    ["userTimeline", email, currentPage],
    () =>
      UserJourneyService.getUserTimeline({
        page: currentPage,
        searchEmail: email,
      }),
    {
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(email),
      onSuccess: (response: IUserTimelineAPIResponse) => {
        if (
          Array.isArray(response.data.results) &&
          response.data.results.length === 0
        ) {
          ShowAlert({
            message: "No timeline is found with this email",
            status: "error",
          });
          setTimelinesData([]);
          setNextPage(null);
          prevEmail.current = email;
          return;
        }
        if (prevEmail.current === email) {
          setTimelinesData((timeline) => [
            ...timeline,
            ...response.data.results,
          ]);
        } else {
          setTimelinesData(response.data.results);
        }

        setNextPage(response.data.next);
        callback && callback(response);
        prevEmail.current = email;
      },
    }
  );

  const userTimelines = useMemo<IUserTimeline[]>(() => {
    const timelines = timelinesData.reduce((groupTimelines, timeline) => {
      const date = timeline.updated.split("T")[0];
      if (!groupTimelines[date]) {
        groupTimelines[date] = [];
      }
      groupTimelines[date].push(timeline);
      return groupTimelines;
    }, {} as any);

    const timelinesArray = Object.keys(timelines).map((date) => {
      return {
        date,
        events: timelines[date],
      };
    });

    return timelinesArray;
  }, [timelinesData]);

  return { isLoading, isFetching, userTimelines, nextPage };
}
