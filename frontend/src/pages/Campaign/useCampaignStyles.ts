import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: { paddingRight: "0!important", maxWidth: "1000px" },

  "@media screen and (max-width:800px)": {
    container: {
      paddingRight: "0!important",
    },
  },
});

export default function useCampaignStyles(...args: never[]) {
  return useStyles();
}
