import { useCallback, useState } from "react";

export const useToggle = (initialValue: boolean): [boolean, () => void] => {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggleValue = useCallback(() => setValue((value) => !value), []);

  return [value, toggleValue];
};
