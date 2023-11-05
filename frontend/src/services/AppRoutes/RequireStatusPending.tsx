import { useMemo } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "../../app/hooks";
import { paths } from "./paths";

function RequireStatusPending() {
  const subscriptions = useAppSelector((state) => state.billing.subscriptions);

  const pendingSubscriptions = useMemo(
    () =>
      subscriptions.every((subscription) => subscription.status === "PENDING"),
    [subscriptions]
  );

  const expiredSubscriptions = useMemo(
    () =>
      subscriptions.every((subscription) => {
        const expiry = new Date(subscription.expiry).getTime();
        const current = new Date().getTime();

        return expiry < current;
      }),
    [subscriptions]
  );

  if (pendingSubscriptions || expiredSubscriptions) {
    return <Outlet />;
  } else return <Navigate to={paths.dashboard} />;
}

export default RequireStatusPending;
