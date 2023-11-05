import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";

import { useAppSelector } from "../../../app/hooks";
import { ShowAlert } from "../../../features/alert";
import { useAudienceActions } from "../../../features/audience";
import {
  CustomButton,
  CustomLabelWithSelect,
  OpacityTransition,
} from "../../Common";

const useStyles = makeStyles({
  organizeContainer: {
    width: "50%",
    padding: "16px",
  },
  headerText: {
    fontWeight: 600,
    fontSize: "1.6rem",
    color: "var(--dark)",
  },
  container: {
    marginTop: "30px",
  },
  statusDescription: {
    margin: "10px 0",
    padding: "5px",
    color: "var(--dark)",
  },
  checkboxContainer: {
    marginTop: "10px",
  },
  checkboxDescription: {
    padding: "0 25px",
    color: "var(--secondary)",
  },
  buttonContainer: {
    marginTop: "25px",
  },

  "@media screen and (min-width:600px) and (max-width:1000px)": {
    organizeContainer: {
      width: "90%",
    },
  },

  "@media screen and (max-width:600px)": {
    organizeContainer: {
      width: "100%",
    },
  },
});

interface IOrganizeProps {
  switchToSection?: () => void;
}

const Organize: React.FC<IOrganizeProps> = ({ switchToSection }) => {
  const classes = useStyles();
  const { status } = useAppSelector(
    (state) => state.audience.importAudience.organize
  );
  const { setOrganize } = useAudienceActions();

  const [statusValue, setStatusValue] = useState<string>(status);

  const onContinue = () => {
    if (!statusValue) {
      ShowAlert({
        message: "Please select status",
        status: "error",
      });
      return;
    }

    setOrganize({ status: statusValue });
    switchToSection && switchToSection();
  };

  return (
    <OpacityTransition className={classes.organizeContainer}>
      <h4 className={classes.headerText}>Organize your contacts</h4>
      <div className={classes.container}>
        <CustomLabelWithSelect
          label="Select status"
          options={["subscribed", "prospects"]}
          defaultLabelWithValue={{ label: "Please choose status", value: "" }}
          value={statusValue}
          onChange={(e) => setStatusValue(e.target.value)}
        />
        <div className={classes.statusDescription}>
          When you choose the "Subscribe" status for your contacts, it indicates
          that you'be gained permission to market them.
        </div>
        {/* <div className={classes.checkboxContainer}>
          <CustomLabelWithCheckbox label="Update any existing contacts" />
          <div className={classes.checkboxDescription}>
            If any imported contacts are already in your audience, we'll
            automatically replace their information with the data from your
            import. This option may make this import process take longer.
          </div>
        </div> */}
        <div className={classes.buttonContainer}>
          <CustomButton
            endIcon={<BsArrowRightShort fontSize="1rem" />}
            onClick={onContinue}
          >
            Continue to tag
          </CustomButton>
        </div>
      </div>
    </OpacityTransition>
  );
};

export default Organize;
