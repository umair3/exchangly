import React from "react";

import { useAppSelector } from "../../app/hooks";
import { useCampaignActions } from "../../features/campaign";
import { CustomLabelWithSelect } from "../Common";
import { ILabelValue } from "../Common/CustomSelect";

interface IFilterByStatusProps {}

const optionsWithLabels: ILabelValue[] = [
  { label: "Ongoing", value: "ONGOING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Not started", value: "NOT_STARTED" },
];

const FilterByStatus: React.FC<IFilterByStatusProps> = (props) => {
  const { viewByStatus } = useAppSelector((state) => state.campaign.main);
  const { changeStatus } = useCampaignActions();
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    changeStatus(event.target.value);
  };
  return (
    <CustomLabelWithSelect
      value={viewByStatus}
      onChange={onChange}
      defaultLabelWithValue={{ label: "Select Status", value: "" }}
      optionsWithLabels={optionsWithLabels}
      label="View By Status"
    />
  );
};

export default FilterByStatus;
