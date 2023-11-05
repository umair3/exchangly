import { useState } from "react";
import { useQuery } from "react-query";
import { DomainIdentityService } from "../DomainIdentity";
import { IDomainIdentity, IDomainsListAPIResponse } from "../types";

export function useDomainList(callback?: Function) {
  const [domain, setDomain] = useState<null | IDomainIdentity>(null);

  const { isLoading, isFetching } = useQuery(
    ["domainList"],
    DomainIdentityService.getDomainList,
    {
      refetchOnWindowFocus: false,
      onSuccess: (response: IDomainsListAPIResponse) => {
        if (
          response.data &&
          "results" in response.data &&
          Array.isArray(response.data.results)
        ) {
          if (response.data.results.length === 0) {
            callback && callback();
            return;
          }

          setDomain(response.data.results[0]);
        }
      },
    }
  );

  return { domain, isLoading, isFetching };
}
