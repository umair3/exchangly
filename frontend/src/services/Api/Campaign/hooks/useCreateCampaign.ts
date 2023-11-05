import { useMutation, useQueryClient } from "react-query";
import { useNavigation } from "../../../../hooks";
import { paths } from "../../../AppRoutes/paths";
import { CampaignService } from "../Campaign";

export function useCreateCampaign(cb?: () => void) {
  const queryClient = useQueryClient();
  const { goToPath } = useNavigation();

  const { mutate, isLoading } = useMutation(CampaignService.createCampaign, {
    onSuccess: (response) => {
      queryClient.invalidateQueries("campaignList");
      goToPath(paths.campaign);
      cb && cb();
    },
  });

  return { createCampaign: mutate, isLoading };
}
