import { useState } from "react";
import { useQuery } from "react-query";
import { usePagination } from "../../../../hooks";
import { CampaignService } from "../Campaign";
import { ICampaignListAPI, ICampaignListResponseAPI } from "../types";

export function useCampaignListAPI() {
  const [list, setList] = useState<ICampaignListAPI[]>([]);

  const { currentPage, changeCurrentPage, totalPages, changeCount, count } =
    usePagination({
      count: 10,
      pageToShow: 1,
    });

  const { isLoading, isFetching } = useQuery(
    ["campaignList", currentPage],
    () => CampaignService.getCampaignsList(currentPage),
    {
      refetchOnWindowFocus: false,
      onSuccess: (response: ICampaignListResponseAPI) => {
        if (
          response.data &&
          "results" in response.data &&
          Array.isArray(response.data.results)
        ) {
          setList(response.data.results);
          changeCount(response.data.count);
        }
      },
    }
  );
  return {
    isLoading,
    isFetching,
    list,
    currentPage,
    changeCurrentPage,
    totalPages,
    changeCount,
    count,
  };
}
