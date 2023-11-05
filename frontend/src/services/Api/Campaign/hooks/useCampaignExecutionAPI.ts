import { useState } from "react";
import { useQuery } from "react-query";
import { useAppSelector } from "../../../../app/hooks";
import { usePagination } from "../../../../hooks";
import { CampaignService } from "../Campaign";
import {
  ICampaignExecutionsListAPI,
  ICampaignExecutionsListResponseAPI,
} from "../types";

export function useCampaignExecutionAPI() {
  const [list, setList] = useState<ICampaignExecutionsListAPI[]>([]);
  const { viewByCampaign, viewByStatus } = useAppSelector(
    (state) => state.campaign.main
  );
  const { currentPage, changeCurrentPage, totalPages, changeCount, count } =
    usePagination({
      count: 10,
      pageToShow: 1,
    });

  const { isLoading, isFetching } = useQuery(
    ["campaignExecutions", currentPage, viewByCampaign, viewByStatus],
    () =>
      CampaignService.getCampaignExecutions({
        page: currentPage,
        campaignId: Number(viewByCampaign),
        status: viewByStatus,
      }),
    {
      refetchOnWindowFocus: false,
      onSuccess: (response: ICampaignExecutionsListResponseAPI) => {
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
  };
}
