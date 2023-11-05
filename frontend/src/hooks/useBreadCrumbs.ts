import { useCallback, useState } from "react";

import { getIndexOfEnum } from "../utils";

interface IUseBreadCrumbs<T> {
  initialState: string[];
  value: string;
  type: T;
}

export function useBreadCrumbs<T extends object>({
  initialState,
  value,
  type,
}: IUseBreadCrumbs<T>) {
  const [selectedValue, setSelectValue] = useState<number>(
    initialState.indexOf(value)
  );

  const changeSelectValue = useCallback(
    (value: number) => setSelectValue(value),
    []
  );

  const switchToSection = useCallback((value: string) => {
    setSelectValue(initialState.indexOf(value));
  }, []);

  const getIndex = useCallback((value: keyof T) => {
    return getIndexOfEnum(type, value);
  }, []);

  return {
    selectedValue,
    changeSelectValue,
    switchToSection,
    getIndex,
  };
}
