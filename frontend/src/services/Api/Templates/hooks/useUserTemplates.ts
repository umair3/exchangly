import { useState } from "react";
import { useQuery } from "react-query";
import { TemplatesService } from "../Templates";
import { IUserTemplateAPI, IUserTemplatesAPIResponse } from "../types";

interface IUseUserTemplatesParams {
  currentPage: number;
  callback?: (data: IUserTemplatesAPIResponse) => void;
}

export function useUserTemplates({
  currentPage,
  callback,
}: IUseUserTemplatesParams) {
  const [templates, setTemplates] = useState<IUserTemplateAPI[]>([]);
  const [nextPage, setNextPage] = useState<null | string>(null);

  const { isLoading, isFetching } = useQuery(
    ["userTemplates", currentPage],
    () => TemplatesService.getUserTemplates(currentPage),
    {
      refetchOnWindowFocus: false,
      onSuccess: (response: IUserTemplatesAPIResponse) => {
        setTemplates((templates) => [...templates, ...response.data.results]);
        setNextPage(response.data.next);
        callback && callback(response);
      },
    }
  );

  return { isLoading, isFetching, templates, nextPage };
}
