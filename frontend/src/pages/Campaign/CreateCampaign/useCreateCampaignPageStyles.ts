import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  buttonContainer: {
    width: "min(100%,70rem)",
    marginBlock: "1rem",
    marginInline: "auto",

    backgroundColor: "var(--light)",
    padding: "2em",
    display: "flex",
    justifyContent: "end",
    flexWrap: "wrap",
    gap: "1em",
  },
});

export function useCreateCampaignPageStyles() {
  return useStyles();
}
