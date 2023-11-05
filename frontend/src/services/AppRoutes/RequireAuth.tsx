import { Outlet } from "react-router-dom";

import { useAppSelector } from "../../app/hooks";

const mainURL: string = process.env.REACT_APP_MAIN_URL as string;

function RequireAuth() {
  const user = useAppSelector((state) => state.user);

  if (!user || (user && (!user.isAuthenticated || !user.profile))) {
    window.location.href = mainURL;
    return null;
  }
  return <Outlet />;
}

export default RequireAuth;
