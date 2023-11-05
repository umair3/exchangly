import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
  value: {
    fontSize: "1rem",
    lineHeight: "24px",
    fontWeight: "bold",
    cursor: "pointer",
    letterSpacing: "1px",
    "&:hover": {
      color: "var(--secondary)",
    },
  },
  selectedValue: {
    color: "var(--secondary)",
  },

  disabled: {
    opacity: 0.5,
    color: "#454545",
    pointerEvents: "none",
    fontWeight: "normal",
    cursor: "not-allowed",
  },

  "@media screen and (max-width:400px)": {
    value: {
      letterSpacing: "0px",
      fontSize: "0.8rem",
    },
  },
});

interface IBreadCrumbsProps {
  values: string[];
  selectedValue: number;
  onClick: (value: number) => void;
}

const CustomBreadCrumbs: React.FunctionComponent<IBreadCrumbsProps> = ({
  values,
  selectedValue,
  onClick,
}) => {
  const classes = useStyles();

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      {React.Children.toArray(
        values.map((value, index) => {
          return (
            <div
              className={`${classes.value} ${
                selectedValue === index && classes.selectedValue
              } ${selectedValue < index && classes.disabled} `}
              onClick={() => onClick(index)}
            >
              {value}
            </div>
          );
        })
      )}
    </Breadcrumbs>
  );
};

export default CustomBreadCrumbs;
