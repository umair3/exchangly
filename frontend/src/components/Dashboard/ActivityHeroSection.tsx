import { makeStyles } from "@mui/styles";
import React from "react";
import { AiOutlineAppstoreAdd } from "react-icons/ai";

import { paths } from "../../services/AppRoutes/paths";
import { CustomButton } from "../Common";

const useStyles = makeStyles({
  container: {
    backgroundColor: "var(--light50)",
    position: "relative",
    padding: "3em",
  },
  hero: {
    width: "100%",
    maxWidth: "35ch",
    display: "flex",
    flexDirection: "column",
    gap: "0.6em",
  },
  title: {
    fontSize: "1.1rem",
    opacity: 0.8,
    fontWeight: "bold",
    lineHeight: 1.2,
  },
  paragraph: {
    fontSize: "0.9rem",
  },
  buttonContainer: {
    marginTop: "1.2em",
    width: "max-content",
  },
});

interface IActivityHeroSectionProps {}

const ActivityHeroSection: React.FC<IActivityHeroSectionProps> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.hero}>
        <h4 className={classes.title}>
          This Section is your feed. Your most important marketing activity will
          show up here.
        </h4>
        <p className={classes.paragraph}>
          Once your campaign is under way, things will look a lot more exciting.
        </p>
      </div>
      <div className={classes.buttonContainer}>
        <CustomButton
          startIcon={<AiOutlineAppstoreAdd fontSize="1rem" />}
          type="link"
          href={paths.createCampaign}
        >
          Create Campaign
        </CustomButton>
      </div>
    </div>
  );
};

export default ActivityHeroSection;
