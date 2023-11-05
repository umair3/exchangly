import { makeStyles } from "@mui/styles";
import React from "react";
import { useNavigation } from "../../../hooks";

import { CustomButton } from "../../Common";

const useStyles = makeStyles({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "1em",
  },
  learnHow: {
    textAlign: "center",
    width: "100%",

    "& span": {
      fontStyle: "italic",
      color: "var(--secondary)",
      marginLeft: "0.4em",

      cursor: "pointer",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  },
  buttonsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1em",
    justifyContent: "flex-end",
    backgroundColor: "var(--light50)",
    padding: "2em",
    borderRadius: "1em",
  },
});

interface IDomainFooterProps {}

const DomainFooter: React.FC<IDomainFooterProps> = (props) => {
  const classes = useStyles();
  const { goBack } = useNavigation();

  return (
    <div className={classes.container}>
      <div className={classes.learnHow}>
        Learn more about{}
        <span>how to setup SPF and DKIM records for your domain</span>
      </div>
      <div className={classes.buttonsContainer}>
        <CustomButton outline>Hire a Consultant</CustomButton>

        <CustomButton onClick={goBack}>I'll verify later</CustomButton>
      </div>
    </div>
  );
};

export default DomainFooter;
