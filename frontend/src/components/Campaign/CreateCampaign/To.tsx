import { makeStyles } from "@mui/styles";
import React, { useEffect } from "react";
import { MultiValue } from "react-select";

import AsyncSelect from "react-select/async";

import { ShowAlert } from "../../../features/alert";
import { useCampaignActions } from "../../../features/campaign";
import {
  ILabelValue,
  useReactMultiSelect,
  useReactSelectStyles,
} from "../../../hooks";
import { ITagAPI } from "../../../services/Api/Audience";
import { useSearchTags } from "../../../services/Api/Audience/hooks";

import { CustomButton, OpacityTransition } from "../../Common";
import NoContacts from "./NoContacts";

const useStyles = makeStyles({
  container: {
    width: "min(600px,100%)",
    paddingInline: "2.5em",
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    fontWeight: "lighter",
    alignItems: "center",
  },
  selectContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "0.5em",
  },
  description: {
    fontSize: "0.8rem",
    opacity: 0.9,

    fontWeight: "bold",
    "& span": {
      color: "var(--secondary)",
      marginInline: "0.2rem",
    },
  },
  actionsContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "0.5em",
    marginBlock: "0.3em 0",
    flexWrap: "wrap",
  },
  cancel: {
    textDecoration: "underline",
    color: "var(--secondary)",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    textTransform: "capitalize",
    "&:hover": {
      filter: "brightness(110%)",
    },
  },

  "@media screen and (max-width:650px)": {
    container: {
      paddingInline: "1.2em!important",
    },
  },
});

interface IToProps {
  nextStep: () => void;
  prevStep: () => void;
  count: number;
  recipientTags: MultiValue<ILabelValue>;
  tags: ITagAPI[];
}

const To: React.FC<IToProps> = ({
  nextStep,
  count,
  recipientTags,
  prevStep,
  tags,
}) => {
  const classes = useStyles();
  const styles = useReactSelectStyles<ILabelValue>();
  const fetchTags = useSearchTags(300, "id");
  const {
    inputValue,
    onInputChange,
    onSelectChange,
    selectedOptions,

    changeSelectedOptionsTo,
  } = useReactMultiSelect();
  const { updateRecipientTags } = useCampaignActions();

  useEffect(() => {
    changeSelectedOptionsTo(recipientTags);
  }, []);

  const onContinue = () => {
    if (!selectedOptions.length) {
      ShowAlert({
        message: "Please select tags for audience",
        status: "error",
      });
      return;
    }

    updateRecipientTags(selectedOptions);

    nextStep();
  };

  return (
    <OpacityTransition className={classes.container}>
      {count ? (
        <React.Fragment>
          <div className={classes.selectContainer}>
            <AsyncSelect
              isClearable
              isMulti
              styles={styles}
              loadOptions={fetchTags}
              cacheOptions
              closeMenuOnSelect={false}
              blurInputOnSelect={false}
              placeholder="Search tags for audience"
              inputValue={inputValue}
              onInputChange={onInputChange}
              onChange={onSelectChange}
              value={selectedOptions}
              defaultOptions={tags.map((tag) => ({
                label: tag.title,
                value: String(tag.id),
              }))}
            />
            <p className={classes.description}>
              Note:<span>Recipients</span> will be selected from these
              <span>tags</span>
            </p>
          </div>

          <div className={classes.actionsContainer}>
            <CustomButton onClick={onContinue}>Continue</CustomButton>
            <div className={classes.cancel} onClick={prevStep}>
              Back
            </div>
          </div>
        </React.Fragment>
      ) : (
        <NoContacts />
      )}
    </OpacityTransition>
  );
};

export default React.memo(To);
