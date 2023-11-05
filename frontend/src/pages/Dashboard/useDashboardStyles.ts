import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  mainSection: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",

    gap: "3em",
  },
  activity: {
    flex: "1 1 60%",

    borderBottom: "1px solid var(--light20)",
  },
  audience: {
    flex: "1 1 35%",
    minWidth: "30ch",
  },

  endFeed: {
    display: "flex",
    alignItems: "center",
    gap: "3em",
    flexWrap: "wrap",
    paddingBlock: "1.5em",
  },
  icon: {
    opacity: "0.8",
    color: "var(--secondary)",
  },
  typography: {
    fontSize: "1rem",
    opacity: "0.8",
    color: "var(--secondary)",
    fontWeight: "bold",
  },
});

export default function useDashboardStyles(...args: never[]) {
  const classes = useStyles();
  return { classes };
}
