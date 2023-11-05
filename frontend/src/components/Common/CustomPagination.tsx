import { Pagination } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "var(--light)",
    padding: "1em",
    borderRadius: "2em",
    boxShadow: "1px 1px 5px var(--light)",
  },
  pagination: {
    "& .Mui-selected": {
      backgroundColor: "var(--secondary)!important",
      color: "var(--light)!important",
    },

    "& .MuiPaginationItem-root": {
      backgroundColor: "var(--primary)",
      color: "var(--light)",
      padding: "0.5em",
      borderRadius: "2em",
      fontWeight: "bold",

      "&:hover": {
        backgroundColor: "var(--secondary)!important",
        color: "var(--light)!important",
      },
    },
  },
});

interface ICustomPaginationProps {
  className?: string;
  totalPages: number;
  currentPage: number;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const CustomPagination: React.FC<ICustomPaginationProps> = ({
  className,
  totalPages,
  currentPage,
  onChange,
}) => {
  const classes = useStyles();

  const classNames = [classes.container, className ? className : ""].join(" ");

  return (
    <div className={classNames}>
      <Pagination
        count={totalPages}
        page={currentPage}
        classes={{ root: classes.pagination }}
        onChange={onChange}
      />
    </div>
  );
};

export default CustomPagination;
