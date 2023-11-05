import React, { useEffect, useRef } from "react";

export function useUpdateEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList | undefined
) {
  const firstRenderRef = useRef<boolean>(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    return effect();
  }, deps);
}
