import React from "react";
import { useAppSelector } from "../../app/hooks";
import { useCampaignActions } from "../../features/campaign";

import { CustomLabelWithSelect } from "../Common";
import { ILabelValue } from "../Common/CustomSelect";

interface IFilterByCampaignProps {
  options: ILabelValue[];
}

const FilterByCampaign: React.FC<IFilterByCampaignProps> = ({ options }) => {
  const { viewByCampaign } = useAppSelector((state) => state.campaign.main);

  const { changeCampaign } = useCampaignActions();
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    changeCampaign(event.target.value);
  };

  return (
    <CustomLabelWithSelect
      value={viewByCampaign}
      onChange={onChange}
      defaultLabelWithValue={{ label: "Select Campaign", value: "" }}
      optionsWithLabels={options}
      label="View By Campaign"
    />
  );
};

export default FilterByCampaign;
