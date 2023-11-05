import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "../../app/hooks";
import { paths } from "./paths";

function RequireFirstSubscription() {
  const subscriptions = useAppSelector((state) => state.billing.subscriptions);

  if (!subscriptions.length) {
    return <Outlet />;
  } else return <Navigate to={paths.dashboard} />;
}

export default RequireFirstSubscription;
