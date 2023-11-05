import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

const CustomSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "var(--secondary)",
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "var(--secondary)",
  },
}));

export default CustomSwitch;
