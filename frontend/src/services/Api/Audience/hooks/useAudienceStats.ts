import { useQuery } from "react-query";
import { AudienceService } from "../Audience";
import { IAudienceStatsResponseAPI } from "../types";

export function useAudienceStats() {
  return useQuery<IAudienceStatsResponseAPI>(
    ["audienceStats"],
    AudienceService.getAudienceStats,
    {
      refetchOnWindowFocus: false,
    }
  );
}
