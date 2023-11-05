import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  wrapper: {
    margin: "15px 0px",
    minHeight: "100px",
    height: "auto",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  modal: {
    padding: "min(2em,50vh)",
    width: "min(400px,98%)",
    top: "max(30vh,40%)",
    overflow: "auto",
  },
});

export function useDomainIdentityStyles() {
  return useStyles();
}
