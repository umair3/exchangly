import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    padding: "3em 7em",
  },
  wrapper: {
    margin: "15px 0px",
    minHeight: "100px",
    height: "auto",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  "@media screen and (max-width:800px)": {
    container: {
      padding: "3em",
    },
  },

  "@media screen and (max-width:500px)": {
    container: {
      padding: "3em 1em",
    },
  },
});

export function useImportContactStyles() {
  const classes = useStyles();

  return classes;
}
