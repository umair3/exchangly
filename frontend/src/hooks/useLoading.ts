import { useState } from "react";

export const useLoading = (
  initialValue: boolean = false
): [boolean, (value: boolean) => void] => {
  const [loading, setLoading] = useState<boolean>(initialValue);

  const changeLoadingState = (value: boolean) => setLoading(value);

  return [loading, changeLoadingState];
};
