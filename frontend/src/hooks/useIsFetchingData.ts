import { useState } from "react";
import { useIsFetching } from "react-query";
import { useUpdateEffect } from "./useUpdateEffect";

export function useIsFetchingData(watchQuerties: string[]) {
  const [isFetching, setIsFetching] = useState(true);
  const numberOfQueries = useIsFetching(watchQuerties);

  useUpdateEffect(() => {
    setIsFetching(!!numberOfQueries);
  }, [numberOfQueries]);

  return isFetching;
}
