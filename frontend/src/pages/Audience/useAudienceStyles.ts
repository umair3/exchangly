import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  paginationContainer: {
    paddingInline: "0.2em",
    width: "100%",
    marginBlock: "1em",
    display: "flex",
    justifyContent: "center",
  },

  container: {
    margin: "1% 0",
    maxWidth: "1200px",
    paddingRight: "0!important",
    marginInline: "auto",
  },
  headerText: {
    fontSize: "1.4rem",
    color: "var(--primary)",
    letterSpacing: "1px",
    fontWeight: 600,
  },

  "@media screen and (max-width:600px)": {
    headerText: {
      fontSize: "1.2rem",
    },
  },
});

export function useAudienceStyles() {
  return useStyles();
}
