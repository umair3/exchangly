import { useCallback } from "react";
import { useAppSelector } from "../../../app/hooks";
import {
  ISelectedPlanWithChargeOptions,
  IAddonWithChargeOption,
  useBillingActions,
} from "../../../features/billing";

export function useSelectPlan() {
  const selectedPlan = useAppSelector((state) => state.billing.selectedPlan);
  const { setSelectedPlan, removeSelectedPlan, addAddon, removeAddon } =
    useBillingActions();

  const changeSelectedOption = useCallback(
    (value: ISelectedPlanWithChargeOptions) => {
      setSelectedPlan(value);
    },
    []
  );

  const removeSelectedOption = useCallback((..._args: never) => {
    removeSelectedPlan();
  }, []);

  const addAddonForPlan = useCallback((addon: IAddonWithChargeOption) => {
    addAddon(addon);
  }, []);

  const removeAddonForPlan = useCallback((addon: IAddonWithChargeOption) => {
    removeAddon(addon);
  }, []);

  return {
    selectedPlan,
    changeSelectedOption,
    removeSelectedOption,
    addAddonForPlan,
    removeAddonForPlan,
  };
}
