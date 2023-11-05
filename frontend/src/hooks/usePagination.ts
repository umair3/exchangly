import { useCallback, useMemo, useState } from "react";

export interface IUsePaginationParams {
  pageToShow: number;
  count: number;
}

const PageSize = 10;

export function usePagination(initialValues: IUsePaginationParams) {
  const [currentPage, setCurrentPage] = useState<number>(
    initialValues.pageToShow
  );

  const [count, setCount] = useState<number>(initialValues.count);

  const totalPages = useMemo<number>(
    () => Math.floor((count + PageSize - 1) / PageSize),
    [count, initialValues.count]
  );

  const changeCurrentPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const changeCount = useCallback((newCount: number) => {
    setCount(newCount);
  }, []);

  const resetPagination = useCallback(() => {
    setCurrentPage(initialValues.pageToShow);
    setCount(initialValues.count);
  }, []);

  return {
    currentPage,
    changeCurrentPage,
    totalPages,
    changeCount,
    count,
    resetPagination,
  };
}
