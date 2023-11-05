import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5em",
    paddingBlock: "3em",
    maxWidth: "1520px",
  },

  info: {
    display: "flex",
    flexDirection: "column",
    gap: "1em",
    paddingRight: "0.5em",

    "& h2": {
      color: "var(--secondary)",
      fontWeight: "bold",
      textShadow: "0 0  1px var(--secondary)",
      paddingBlock: "0.5em",
      borderBottom: "1px solid var(--secondary)",
      fontSize: "1.5rem",
    },
    "& h4": {
      opacity: 0.8,
      fontWeight: "bold",
    },
  },
});

export function useEmailsIdentityStyles() {
  return useStyles();
}
