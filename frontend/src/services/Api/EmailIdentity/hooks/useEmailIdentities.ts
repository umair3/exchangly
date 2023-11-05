import { useState } from "react";
import { useQuery } from "react-query";
import { EmailIdentityService } from "../EmailIdentity";
import { IEmailIdentitiesAPIResponse, IEmailIdentityAPI } from "../types";

interface useEmailIdentitiesParams {
  currentPage: number;
  cb?: (count: number) => void;
}

export function useEmailIdentities(params: useEmailIdentitiesParams) {
  const [identities, setIdentities] = useState<IEmailIdentityAPI[]>([]);

  const { currentPage, cb } = params;

  const { isLoading, isFetching } = useQuery(
    ["emailIdentities", currentPage],
    () => EmailIdentityService.getEmailIdentities(currentPage),
    {
      refetchOnWindowFocus: false,
      onSuccess: (response: IEmailIdentitiesAPIResponse) => {
        if (
          response.data &&
          "results" in response.data &&
          Array.isArray(response.data.results)
        ) {
          setIdentities(response.data.results);
          cb && cb(response.data.count);
        }
      },
    }
  );

  return {
    identities,
    isLoading,
    isFetching,
  };
}
