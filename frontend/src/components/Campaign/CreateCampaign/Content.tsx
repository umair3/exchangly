import React, { useMemo } from "react";
import { makeStyles } from "@mui/styles";
import { MdEditLocationAlt } from "react-icons/md";

import { CustomButton, CustomModal, OpacityTransition } from "../../Common";

import ShowContent from "./ShowContent";
import { useAppSelector } from "../../../app/hooks";

import { useNavigation, useToggle } from "../../../hooks";
import ContentEditor from "./ContentEditor";

const useStyles = makeStyles({
  wrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "1em",
  },
  innerContainer: {
    backgroundColor: "var(--light)",
    padding: "0.5em",
    inset: 0,
    display: "flex",
    width: "100%",
    alignItems: "center",
    fontSize: "1rem",
    fontWeight: "bold",
    flexWrap: "wrap",
    gap: "1em",
  },
  contentInfo: {
    fontSize: "1.2rem",

    flexGrow: 1,
  },
  modal: {
    position: "absolute",
    inset: 0,
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    transition: "all 300ms ease",
    height: "100%",
    width: "100%",
  },
  cancel: {
    textDecoration: "underline",
    color: "var(--secondary)",
    fontSize: "0.9rem",
    cursor: "pointer",
    fontWeight: "bold",
    "&:hover": {
      filter: "brightness(110%)",
    },
  },
  actions: {
    display: "flex",
    alignItems: "center",
    marginTop: "0.5rem",

    flexWrap: "wrap",
    gap: "0.7rem",
    width: "100%",
  },
  button: {
    fontSize: "0.8rem!important",
  },
});

interface IContentProps {
  nextStep: () => void;
}

const Content: React.FC<IContentProps> = ({ nextStep }) => {
  const classes = useStyles();
  const [openModal, setModal] = useToggle(false);
  const { goBack } = useNavigation();

  const template = useAppSelector(
    (state) => state.campaign.createCampaign.template
  );

  const innerContainerStyles = useMemo(
    () => ({
      justifyContent: template ? "flex-end" : "center",
    }),
    [template]
  );

  return (
    <OpacityTransition className={classes.wrapper}>
      <div className={classes.innerContainer} style={innerContainerStyles}>
        {!template && (
          <div className={`${classes.contentInfo} text-gray-500`}>
            To add content click on open editor.
          </div>
        )}

        <button
          className="text-sm bg-gray-50  text-secondary border-2 border-secondary rounded-full px-3 py-2 hover:bg-secondary hover:text-white transition-all"
          onClick={setModal}
        >
          TinyMce Editor
        </button>
      </div>
      <ShowContent htmlData={template} />

      <div className={`${classes.actions}`}>
        <CustomButton className={classes.button} onClick={nextStep}>
          Continue
        </CustomButton>
        <div className={classes.cancel} onClick={goBack}>
          Cancel
        </div>
      </div>
      <CustomModal
        open={openModal}
        handleClose={setModal}
        className={classes.modal}
        removePreviousClassStyles
      >
        <ContentEditor closeModal={setModal} template={template} />
      </CustomModal>
    </OpacityTransition>
  );
};

export default React.memo(Content);
