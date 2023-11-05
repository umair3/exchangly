import { useCallback, useState } from "react";
import {
  ActionMeta,
  InputActionMeta,
  MultiValue,
  OnChangeValue,
} from "react-select";

export interface ILabelValue {
  readonly label: string;
  readonly value: string;
}

export function useReactMultiSelect(options: MultiValue<ILabelValue> = []) {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedOptions, setSelectedOptions] =
    useState<MultiValue<ILabelValue>>(options);

  const onInputChange = useCallback(
    (newValue: string, ActionMeta: InputActionMeta) => {
      if (ActionMeta.action !== "set-value") {
        setInputValue(newValue);
        return newValue;
      }
      return inputValue;
    },
    [inputValue]
  );

  const changeSelectedOptionsTo = useCallback(
    (options: MultiValue<ILabelValue>) => {
      setSelectedOptions(options);
    },
    []
  );

  const onSelectChange = useCallback(
    (
      value: OnChangeValue<ILabelValue, true>,
      actionMeta: ActionMeta<ILabelValue>
    ) => {
      if (actionMeta.action === "create-option") {
        setSelectedOptions((prev) => [
          ...prev,
          {
            label: actionMeta.option.label,
            value: actionMeta.option.value,
          },
        ]);
      } else {
        setSelectedOptions(value);
      }
    },
    []
  );

  const transformOptionsToLabelValue = useCallback((options: string[]) => {
    return options.map((option) => ({ label: option, value: option }));
  }, []);

  const transformLabelValueToOptions = useCallback(
    (options: MultiValue<ILabelValue>) => {
      return options.map((option) => option.value);
    },
    []
  );

  return {
    inputValue,
    onInputChange,
    selectedOptions,
    changeSelectedOptionsTo,
    onSelectChange,
    transformOptionsToLabelValue,
    transformLabelValueToOptions,
  };
}
