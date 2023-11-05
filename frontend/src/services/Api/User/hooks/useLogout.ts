import { useCallback } from "react";
import { useAppDispatch } from "../../../../app/hooks";
import { useUserActions } from "../../../../features/user";
import { useLoading } from "../../../../hooks";

export function useLogout() {
  const { logoutUser } = useUserActions();

  const [loading, setLoading] = useLoading(false);

  const logout = useCallback(() => {
    setLoading(true);

    logoutUser({
      onFinally: () => setLoading(false),
    });
  }, []);

  return { logout, loading };
}
