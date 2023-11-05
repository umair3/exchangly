import { useState } from "react";
import { useQuery } from "react-query";
import { CampaignService } from "../Campaign";
import { ICampaignListAPI, ICampaignListResponseAPI } from "../types";

export function useCampaignExecutionFilterOptions() {
  const [list, setList] = useState<ICampaignListAPI[]>([]);

  const page = 1;

  const { isLoading, isFetching } = useQuery(
    ["campaignList", page],
    () => CampaignService.getCampaignsList(page),
    {
      refetchOnWindowFocus: false,

      onSuccess: (response: ICampaignListResponseAPI) => {
        if (
          response.data &&
          "results" in response.data &&
          Array.isArray(response.data.results)
        ) {
          setList(response.data.results);
        }
      },
    }
  );

  return { list, isLoading, isFetching };
}
