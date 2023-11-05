import { useState } from "react";
import { useQuery } from "react-query";
import { AudienceService } from "../Audience";
import { IFetchTagsResponseAPI, ITagAPI } from "../types";

export function useFetchTags() {
  const [tags, setTags] = useState<ITagAPI[]>([]);

  const { isLoading, isFetching } = useQuery(
    ["tags"],
    AudienceService.getAllTags,
    {
      refetchOnWindowFocus: false,
      onSuccess: (response: IFetchTagsResponseAPI) => {
        if (response.data && Array.isArray(response.data)) {
          setTags(response.data);
        }
      },
    }
  );

  return { tags, isLoading, isFetching };
}
