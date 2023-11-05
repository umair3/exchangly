import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export function useNavigation() {
  const navigate = useNavigate();

  const goBack = useCallback(() => {
    navigate(-1);
  }, []);
  const goForward = useCallback(() => {
    navigate(1);
  }, []);

  const goToPath = useCallback((path: string) => {
    navigate(path);
  }, []);

  return { goBack, goForward, goToPath };
}
