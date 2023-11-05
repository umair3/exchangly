import { useCallback, useState } from "react";

export function useAccordion() {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = useCallback(
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    },
    []
  );

  return { expanded, handleChange };
}
