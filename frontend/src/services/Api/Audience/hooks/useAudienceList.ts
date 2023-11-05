import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useAppSelector } from "../../../../app/hooks";
import { AudienceService } from "../Audience";
import { IAudienceListAPI, IAudienceListResponseAPI } from "../types";

export function useAudienceList(
  currentPage: number,
  callback?: (data: IAudienceListResponseAPI) => void
) {
  const [list, setList] = useState<IAudienceListAPI[]>([]);

  const { filterByStatus, filterByTags } = useAppSelector(
    (state) => state.audience.root
  );

  const tags = useMemo(() => {
    return filterByTags.map((tag) => tag.value);
  }, [filterByTags]);

  const { isLoading, isFetching } = useQuery(
    ["audienceList", currentPage, filterByStatus, filterByTags],
    () =>
      AudienceService.getAudienceList({
        page: String(currentPage),
        status: filterByStatus?.value || "",
        tags: tags,
      }),
    {
      refetchOnWindowFocus: false,
      onSuccess: (response: IAudienceListResponseAPI) => {
        if (
          response.data &&
          "results" in response.data &&
          Array.isArray(response.data.results)
        ) {
          setList(response.data.results);
          callback && callback(response);
        }
      },
    }
  );

  return { list, isLoading, isFetching };
}
