import { useState } from "react";
import { useQuery } from "react-query";
import { CampaignService } from "../Campaign";
import {
  IExecutionLogByStatusAPI,
  IExecutionLogByStatusResponseAPI,
} from "../types";

export enum EnumExecutionLogStatus {
  SENT = "SENT",
  DELIVERED = "DELIVERED",
  OPENED = "OPENED",
  LINK_CLICKED = "LINK_CLICKED",
}

export function useExecutionLogByStatus(
  status: EnumExecutionLogStatus,
  campaignExecutionId: string
) {
  const [list, setList] = useState<IExecutionLogByStatusAPI[]>([]);

  const { isLoading, isFetching } = useQuery(
    ["executionLog", status, campaignExecutionId],
    () =>
      CampaignService.getExecutionLogByStatus(
        Number(campaignExecutionId),
        status
      ),
    {
      refetchOnWindowFocus: false,
      enabled: !isNaN(Number(campaignExecutionId)),
      onSuccess: (response: IExecutionLogByStatusResponseAPI) => {
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
