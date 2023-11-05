import { useMutation, useQueryClient } from "react-query";
import { CampaignService } from "../Campaign";

export function useDeleteCampaign(cb?: () => void) {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(CampaignService.deleteCampaign, {
    onSuccess: (_response) => {
      queryClient.invalidateQueries("campaignList");
      cb && cb();
    },
  });

  return { mutate, isLoading };
}
