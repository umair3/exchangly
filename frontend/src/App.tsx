import { useCallback, useEffect } from "react";

import { CircularLoader } from "./components/Common";
import { useBillingActions } from "./features/billing";

import { useUserActions } from "./features/user";
import { useLoading } from "./hooks";
import AppRoutes from "./services/AppRoutes";

function App() {
  const [userLoading, setUserLoading] = useLoading(true);
  const [subscriptionLoading, setSubscriptionLoading] = useLoading(true);
  const { getCurrentSubscription } = useBillingActions();
  const { getUserProfile } = useUserActions();

  const initialFetching = useCallback(() => {
    getUserProfile({
      onFinally: () => setUserLoading(false),
      onError: () => setSubscriptionLoading(false),
      onSuccess: () =>
        getCurrentSubscription({
          onFinally: () => setSubscriptionLoading(false),
        }),
    });
  }, []);

  useEffect(() => {
    initialFetching();
  }, [initialFetching]);
  console.log(`userLoading: ${userLoading}`)
  console.log(`subscriptionLoading: ${subscriptionLoading}`)
  if (userLoading || subscriptionLoading) {
    console.log(userLoading)
    console.log(subscriptionLoading)
    return <CircularLoader />;
  }
  return <AppRoutes />;
}

export default App;
