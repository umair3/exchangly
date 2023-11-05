import { makeStyles } from "@mui/styles";
import { useMemo, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { IAddonWithChargeOption } from "../../features/billing";
import { IPlanJSON } from "../../services/Api/Billing";
import { CustomSwitch } from "../Common";
import { IAddonAction } from "./hooks";
import { useChargeOption } from "../../services/Api/Billing";

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "space-evenly",
    width: "100%",
    alignItems: "center",
    gap: ".4em",
  },
  title: {
    width: "fit-content",
    fontSize: "1rem",
  },
  price: {
    fontWeight: "bold",
  },
  priceSymbol: {
    fontSize: "1rem",
  },
  actualPrice: {
    fontSize: "1rem",
  },
});

interface IAddonItemProps {
  planId: number;
  id: number;
  title: string;
  description: string;
  features?: Partial<IPlanJSON>;
  addPrice: (priceToAdd: number) => void;
  removePrice: (priceToRemove: number) => void;
  changeAddon: (addon: IAddonWithChargeOption, action: IAddonAction) => void;
}

const AddonItem: React.FC<IAddonItemProps> = ({
  planId,
  id,
  title,
  description,
  features,
  addPrice,
  removePrice,
  changeAddon,
}) => {
  const classes = useStyles();

  const { isLoading, chargeOption } = useChargeOption(id);

  const selectedPlan = useAppSelector((state) => state.billing.selectedPlan);

  const checked = useMemo(() => {
    if (selectedPlan) {
      return selectedPlan.addons.some(
        (addon) => addon.id === id && selectedPlan.planId === planId
      );
    }
    return false;
  }, [selectedPlan]);

  const [checkedAdddon, setCheckedAddon] = useState(checked);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedAddon(event.target.checked);

    if (chargeOption) {
      const addonData = {
        id,
        chargeOptionId: chargeOption.id,
        price: parseFloat(chargeOption.price),
        title,
      };

      if (!event.target.checked) {
        removePrice(parseFloat(chargeOption?.price));
        changeAddon(addonData, "remove");
        return;
      } else if (event.target.checked) {
        addPrice(parseFloat(chargeOption?.price));
        changeAddon(addonData, "add");

        return;
      }
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.title}>{title}</div>
      {!isLoading && chargeOption && (
        <div className={classes.price}>
          <span className={classes.priceSymbol}>$</span>
          <span className={classes.actualPrice}>
            {parseFloat(chargeOption?.price)}
          </span>
        </div>
      )}
      <div>
        <CustomSwitch onChange={handleChange} checked={checkedAdddon} />
      </div>
    </div>
  );
};

export default AddonItem;
