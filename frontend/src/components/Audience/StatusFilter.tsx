import React from "react";
import Select, { ActionMeta, SingleValue } from "react-select";

import { AUDIENCE_STATUS } from "../../constants/AudienceStatus";
import { useReactSelectStyles } from "../../hooks";

import { ILabelValue } from "../Common/CustomSelect";
import { useStatusFilter } from "./hooks";

interface IStatusFilterProps {
  resetPagination: () => void;
}

const options: { label: string; value: string }[] = [
  { label: AUDIENCE_STATUS.SUBSCRIBED, value: AUDIENCE_STATUS.SUBSCRIBED },
  { label: AUDIENCE_STATUS.PROSPECTS, value: AUDIENCE_STATUS.PROSPECTS },
];

const StatusFilter: React.FC<IStatusFilterProps> = ({ resetPagination }) => {
  const { status, changeStatusFilter } = useStatusFilter();
  const styles = useReactSelectStyles<ILabelValue, false>();

  const onStatusChange = (
    newValue: SingleValue<ILabelValue>,
    _actionMeta: ActionMeta<ILabelValue>
  ) => {
    resetPagination();

    changeStatusFilter(newValue);
  };

  return (
    <div className="w-full md:max-w-xs">
      <Select
        defaultValue={status}
        name="tags"
        options={options}
        placeholder="Choose status to apply filter"
        styles={styles}
        isClearable
        onChange={onStatusChange}
      />
    </div>
  );
};

export default StatusFilter;
