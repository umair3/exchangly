import React from "react";
import { makeStyles } from "@mui/styles";
import parse from "html-react-parser";
import { HtmlRenderer } from "../../Common";

const useStyles = makeStyles({
  container: {
    width: "100%",

    boxShadow: "1px 1px 2px var(--light20)",
    padding: "1em",
    wordWrap: "inherit",
    overflow: "auto",

    "& img": {
      maxWidth: "100%",
    },
  },
  "@media screen and (max-width:650px)": {
    container: {
      padding: "1em 0em",
    },
  },
});

interface IShowContentProps {
  htmlData: string;
}

const ShowContent: React.FC<IShowContentProps> = ({ htmlData }) => {
  const classes = useStyles();

  if (!htmlData) {
    return null;
  }

  return (
    <div className={`${classes.container} `} style={{ maxWidth: "100%" }}>
      <HtmlRenderer html={htmlData} />
    </div>
  );
};

export default ShowContent;
