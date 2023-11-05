import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    width: "95%",
    maxWidth: "1350px",

    margin: "5vmin auto",
    padding: "1em",
    display: "flex",
    gap: "0.5em",
  },
});

export default function useBillingStyles(...args: never[]) {
  const classes = useStyles();
  return { classes };
}
