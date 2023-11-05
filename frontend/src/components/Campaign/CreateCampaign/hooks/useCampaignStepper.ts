import { useState, useCallback } from "react";

export function useCampaignStepper(initialStep?: number) {
  const [activeStep, setActiveStep] = useState(initialStep || 0);
  const [complete, setComplete] = useState<boolean>(false);

  const handleNext = useCallback((cb?: any) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (cb && typeof cb === "function") {
      cb();
    }
  }, []);

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setComplete(false);
  }, []);

  const handleReset = useCallback(() => {
    setActiveStep(0);
    setComplete(false);
  }, []);

  const changeComplete = useCallback((value: boolean = true) => {
    setComplete(value);
  }, []);

  return {
    activeStep,
    handleNext,
    handleBack,
    handleReset,
    changeComplete,
    complete,
  };
}
