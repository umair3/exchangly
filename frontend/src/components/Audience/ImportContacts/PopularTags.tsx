import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
  container: { marginTop: "20px" },
  tag: {
    color: "var(--light50)!important",
    backgroundColor: "var(--secondary)!important",
    cursor: "pointer!important",
    "&:hover": {
      filter: "brightness(120%)!important",
    },
  },
});

interface IPopularTagsProps {
  tags: string[];
  onTagSelect: (tag: string) => void;
}

const PopularTags: React.FC<IPopularTagsProps> = ({ tags, onTagSelect }) => {
  const classes = useStyles();

  const onSelect = (tag: string) => {
    onTagSelect(tag);
  };

  return (
    <React.Fragment>
      <h4>Choose from popular tags</h4>
      <div className={classes.container}>
        <Stack direction="row" spacing={1}>
          {React.Children.toArray(
            tags.map((tag) => (
              <Chip
                clickable
                label={tag}
                classes={{ root: classes.tag }}
                onClick={() => onSelect(tag)}
              />
            ))
          )}
        </Stack>
      </div>
    </React.Fragment>
  );
};

export default PopularTags;
