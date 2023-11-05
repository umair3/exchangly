import { useCallback, useState } from "react";
import { IAddonWithChargeOption } from "../../../features/billing";

export type IAddonAction = "add" | "remove";

export function useAddons(
  callback?: (addon: IAddonWithChargeOption, action: IAddonAction) => void
) {
  const [addons, setAddons] = useState<IAddonWithChargeOption[]>([]);

  const changeAddon = useCallback(
    (addon: IAddonWithChargeOption, action: IAddonAction) => {
      if (action === "remove") {
        setAddons(addons.filter((addonItem) => addonItem.id !== addon.id));
      } else if (action === "add") {
        setAddons((prevAddons) => [...prevAddons, addon]);
      }

      callback && callback(addon, action);
    },
    [addons, callback]
  );

  return { addons, changeAddon };
}
