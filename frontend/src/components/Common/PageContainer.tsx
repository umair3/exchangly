import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    paddingInline: "7em",
    paddingBlock: "1em",
    width: "100%",
    maxWidth: "1200px",
  },

  "@media screen and (max-width:800px)": {
    container: {
      paddingInline: "3em",
    },
  },

  "@media screen and (max-width:650px)": {
    container: {
      paddingInline: "1em",
    },
  },

  "@media screen and (max-width:300px)": {
    container: {
      paddingInline: "0.5em",
    },
  },
});

interface IPageContainerProps {
  className?: string;
  marginAuto?: boolean;
  style?: React.CSSProperties;
}

const PageContainer: React.FC<IPageContainerProps> = ({
  children,
  className,
  marginAuto = false,
  style = {},
}) => {
  const classes = useStyles();
  const classNames = [classes.container, className && className].join(" ");

  return (
    <div
      className={classNames}
      style={{ marginInline: marginAuto ? "auto" : undefined, ...style }}
    >
      {children}
    </div>
  );
};

export default PageContainer;
