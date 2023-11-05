import { useState } from "react";
import { ActionMeta, SingleValue } from "react-select";
import { ILabelValue } from "../components/Common/CustomSelect";

export function useReactSelect(defaultValue?: string) {
  const [value, setValue] = useState<ILabelValue | null>(
    defaultValue ? { label: defaultValue, value: defaultValue } : null
  );

  const onChangeValue = (
    newValue: SingleValue<ILabelValue>,
    _actionMeta: ActionMeta<ILabelValue>
  ) => {
    setValue(newValue);
  };

  return { value, onChangeValue };
}
