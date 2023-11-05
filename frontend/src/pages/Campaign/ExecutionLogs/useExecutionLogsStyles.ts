import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    paddingInline: "4em",
    marginBlock: "1.5em",
    paddingBlock: "1em 0",
    width: "100%",
    maxWidth: "1400px",
  },
  wrapper: {
    display: "flex",
    gap: "-1.2em",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    gap: "1em",
    marginBlock: "2em 1em",
    border: "1px solid var(--light20)",

    boxShadow: "5px 5px 2px var(--light20)",
  },
  paddingAndBorderRadius: {
    padding: "0.3em 1em",
    borderRadius: "1em",
  },
  "@media screen and (max-width:800px)": {
    container: {
      paddingInline: "3em",
    },
  },

  "@media screen and (max-width:500px)": {
    container: {
      paddingInline: "0.7em",
    },
  },
});

export function useExecutionLogsStyles() {
  return useStyles();
}
