import Tooltip from "@mui/material/Tooltip";
import { withStyles } from "@mui/styles";

const TooltipWithStyles = withStyles({
  tooltip: {
    color: "var(--light)!important",
    backgroundColor: "var(--primary)!important",
    padding: "10px",
  },
  arrow: {
    color: "var(--primary)!important",
  },
})(Tooltip);

export default TooltipWithStyles;
