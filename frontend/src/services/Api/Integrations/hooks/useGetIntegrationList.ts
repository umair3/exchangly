import { useState } from "react";
import { useQuery } from "react-query";
import { IntegrationService } from "../Integrations";
import { IIntegrationsListResponseAPI, ISingleIntegrationAPI } from "../types";

interface useGetIntegrationListParams {
  currentPage: number;
  cb: (count: number) => void;
}

export function useGetIntegrationList(params: useGetIntegrationListParams) {
  const [list, setList] = useState<ISingleIntegrationAPI[]>([]);

  const { currentPage, cb } = params;

  const { isLoading, isFetching } = useQuery(
    ["integrationList", currentPage],
    () => IntegrationService.getIntegrationsList(currentPage),
    {
      refetchOnWindowFocus: false,
      onSuccess: (response: IIntegrationsListResponseAPI) => {
        if (response.data) {
          setList(response.data.results);

          cb(response.data.count);
        }
      },
    }
  );

  return {
    list,
    isLoading,
    isFetching,
  };
}
