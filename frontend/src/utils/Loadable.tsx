import React, { ComponentType, lazy, Suspense } from "react";

import { LinearLoader } from "../components/Common";

type lazyFunction = () => Promise<{ default: ComponentType<any> }>;
interface IOtherProps {
  fallback?: null | React.ReactNode;
}

const loadable = (
  importFunc: lazyFunction,
  { fallback = <LinearLoader /> }: IOtherProps
) => {
  const LazyComponent = lazy(importFunc);

  return (props: any) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default loadable;
