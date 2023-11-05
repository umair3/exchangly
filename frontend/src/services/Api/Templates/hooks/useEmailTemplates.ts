import { useState } from "react";
import { useQuery } from "react-query";
import { TemplatesService } from "../Templates";
import { IEmailTemplatesAPIResponse, IEmailTemplateAPI } from "../types";

interface IUseEmailTemplatesParams {
  currentPage: number;
  callback?: (data: IEmailTemplatesAPIResponse) => void;
}

export function useEmailTemplates({
  currentPage,
  callback,
}: IUseEmailTemplatesParams) {
  const [templates, setTemplates] = useState<IEmailTemplateAPI[]>([]);
  const [nextPage, setNextPage] = useState<null | string>(null);

  const { isLoading, isFetching } = useQuery(
    ["emailTemplates", currentPage],
    () => TemplatesService.getEmailTemplates(currentPage),
    {
      refetchOnWindowFocus: false,
      onSuccess: (response: IEmailTemplatesAPIResponse) => {
        setTemplates((templates) => [...templates, ...response.data.results]);
        setNextPage(response.data.next);
        callback && callback(response);
      },
    }
  );

  return { isLoading, isFetching, templates, nextPage };
}
