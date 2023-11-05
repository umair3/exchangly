import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  accordion: {
    outline: "none!important",
    boxShadow: "none!important",
    borderTop: "1px solid var(--light50)",
    paddingBlock: "1em",
    paddingInline: "1em",
  },
  "@media screen and (max-width:650px)": {
    accordion: {
      paddingInline: "0",
    },
  },
  accordionSummary: {
    display: "flex",
    gap: "1.2rem",
    flexWrap: "wrap",
    alignItems: "center",
    width: "100%",
    position: "relative",
  },
  icon: {
    opacity: 0.7,
  },
  iconOpacity: {
    color: "var(--secondary)",
    opacity: 1,
  },

  mainTitle: {
    fontSize: "1.2rem",
  },
  placeholder: {
    opacity: 0.9,
    fontWeight: "bold",
  },
  buttonContainer: {
    marginLeft: "auto!important",
  },
  button: {
    opacity: 0.9,
    borderRadius: "2em!important",
    "&:hover": {
      opacity: 1,
    },
  },
  arrowUpIcon: {
    marginLeft: "auto",
    color: "var(--primary)",
  },
});

export function useAccordionStyles() {
  return useStyles();
}
