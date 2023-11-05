import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  header: {
    fontSize: "1.4rem",
    color: "var(--secondary)",
    marginBottom: "1rem",
    fontWeight: 600,

    display: "flex",
    alignItems: "center",
    gap: ".4rem",
    "& h2": {
      flexGrow: 1,
    },
  },
});

export default function useUserJourneyStyles(...args: never[]) {
  return useStyles();
}
