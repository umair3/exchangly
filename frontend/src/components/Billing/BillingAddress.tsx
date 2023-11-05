import React from "react";

import { useToggle } from "../../hooks";
import { CustomLabelWithCheckbox } from "../Common";

interface IBillingAddressProps {}

const BillingAddress: React.FC<IBillingAddressProps> = (props) => {
  const [value, setValue] = useToggle(true);

  return (
    <CustomLabelWithCheckbox
      label="Same as contact address"
      checked={value}
      onChange={setValue}
      allowDisable={true}
    />
  );
};

export default BillingAddress;
