import { useDebouncedCallback } from "use-debounce";

import {
  AudienceService,
  ISearchTagsResponseAPI,
} from "../../../../services/Api/Audience";

export function useSearchTags(
  delay: number = 300,
  value: "title" | "id" = "title"
) {
  const fetchTags = useDebouncedCallback((input: string) => {
    return AudienceService.searchTags(input)
      .then(({ data }: ISearchTagsResponseAPI) => {
        return data.length
          ? data.map(({ title, id }) => ({
              label: title,
              value: value === "id" ? String(id) : title,
            }))
          : [];
      })
      .catch((error) => {
        return [];
      });
  }, delay);

  return fetchTags;
}
