import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { BsArrowRightShort } from "react-icons/bs";

import { PopularTags, SearchAndCreateTag } from ".";
import { ShowAlert } from "../../../features/alert";
import { CustomButton, OpacityTransition } from "../../Common";
import { useTagFunctionality } from "./hooks";

const useStyles = makeStyles({
  tagContainer: {
    padding: "16px",
  },
  headerText: {
    fontWeight: 600,
    fontSize: "1.6rem",
    color: "var(--dark)",
  },

  description: {
    marginTop: "30px",
  },
  gridContainer: {
    marginTop: "30px",
  },
  buttonContainer: {
    marginTop: "25px",
  },
});

interface ITagProps {
  switchToSection?: () => void;
}

const Tag: React.FC<ITagProps> = ({ switchToSection }) => {
  const classes = useStyles();
  const { selectedOptions, onSelectChange, updateStatusTags, onTagSelect } =
    useTagFunctionality();

  const onContinueToComplete = () => {
    if (!selectedOptions.length) {
      ShowAlert({ message: "Tag is required", status: "error" });
      return;
    }
    updateStatusTags();
    switchToSection && switchToSection();
  };

  return (
    <OpacityTransition className={classes.tagContainer}>
      <h4 className={classes.headerText}>Tag your contacts</h4>

      <div className={classes.description}>
        Easily organize your contacts using simple words or phrases that make
        the most sense to you.
      </div>
      <div className={classes.gridContainer}>
        <Grid container spacing={7}>
          <Grid item xs={12} md={7}>
            <SearchAndCreateTag
              onSelectChange={onSelectChange}
              value={selectedOptions}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <PopularTags
              onTagSelect={onTagSelect}
              tags={["Customer", "2022", "Staff", "Influencer", "Member"]}
            />
          </Grid>
        </Grid>
      </div>
      <div className={classes.buttonContainer}>
        <CustomButton
          endIcon={<BsArrowRightShort fontSize="1rem" />}
          onClick={onContinueToComplete}
        >
          Continue to Complete
        </CustomButton>
      </div>
    </OpacityTransition>
  );
};

export default Tag;
