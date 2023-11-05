import { makeStyles } from "@mui/styles";
import React from "react";

import SingleTag, { ISingleTagProps } from "./SingleTag";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "0.9em",

    padding: "0.2em 1em",
  },
});

export interface ITagsWithAudienceProps {
  tags: ISingleTagProps[];
}

const TagsWithAudience: React.FC<ITagsWithAudienceProps> = ({ tags }) => {
  const classes = useStyles();
  return (
    <div className={`${classes.container} md:h-96 md:overflow-y-auto`}>
      {React.Children.toArray(tags.map((tag) => <SingleTag {...tag} />))}
    </div>
  );
};

export default TagsWithAudience;
