import { useMemo } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "../../app/hooks";
import { paths } from "./paths";

function RequireBilling() {
  const subscriptions = useAppSelector((state) => state.billing.subscriptions);

  const activeSubscription = useMemo(() => {
    return subscriptions.some((subscription) => {
      const expiry = new Date(subscription.expiry).getTime();
      const current = new Date().getTime();
      const notExpired = expiry > current;

      return (
        (subscription.status === "ACTIVE" && notExpired) ||
        (subscription.status === "CANCELLED" && notExpired)
      );
    });
  }, [subscriptions]);

  if (!subscriptions.length) {
    return <Navigate to={paths.billing} />;
  }

  if (!activeSubscription) {
    return <Navigate to={paths.statusPending} />;
  } else {
    return <Outlet />;
  }
}

export default RequireBilling;
