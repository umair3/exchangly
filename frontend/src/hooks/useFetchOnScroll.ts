import { useEffect } from "react";
import { debounce } from "../utils";

interface IUseFetchOnScrollParams {
  fetchCall: () => Promise<any>;
}

export function useFetchOnScroll({ fetchCall }: IUseFetchOnScrollParams) {
  useEffect(() => {
    let fetching = false;

    const onScroll = async (event: Event) => {
      const { scrollingElement } = event.target! as Document;
      const { scrollHeight, scrollTop, clientHeight } = scrollingElement!;

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        fetching = true;
        await fetchCall();

        fetching = false;
      }
    };

    document.addEventListener("scroll", debounce(onScroll, 200));

    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  });
}
