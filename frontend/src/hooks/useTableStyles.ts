import { makeStyles } from "@mui/styles";

interface Props {
  align: "center" | "left" | "right";
}

const useStyles = makeStyles({
  table: {
    borderCollapse: "collapse",

    fontSize: "1rem",
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "auto",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.15)",
  },

  tableHeadRow: {
    backgroundColor: "var(--primary)",
    color: "var(--light)",
    textAlign: "left",
    letterSpacing: "1px",
    position: "sticky",

    top: 0,
  },

  tableHeader: (props: Props) => ({
    padding: "12px 15px",
    transition: "position 0.3s ease-in",
    textAlign: props.align,
  }),
  tableData: (props: Props) => ({
    padding: "12px 15px",
    fontWeight: "lighter",
    textShadow: "0 0 1px var(--primary)",
    width: "1px",
    whiteSpace: "nowrap",
    textAlign: props.align,
  }),
  tableBodyRow: {
    borderBottom: "1px solid var(--light50)",

    "&:nth-of-type(even)": {
      backgroundColor: "var(--light50)",
    },

    "&:last-of-type": {
      borderBottom: "2px solid var(--primary)",
    },
  },
});

export function useTableStyles(props: Props = { align: "left" }) {
  return useStyles(props);
}
