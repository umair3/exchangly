import { useMutation } from "react-query";
import { CampaignService } from "../Campaign";

export function useExecuteCampaign(cb?: () => void) {
  const { mutate, isLoading } = useMutation(CampaignService.executeCampaign, {
    onSuccess: (_response) => {
      cb && cb();
    },
  });

  return { mutate, isLoading };
}
