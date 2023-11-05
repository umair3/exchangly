import { makeStyles } from "@mui/styles";
import millify from "millify";
import React from "react";
import { MdClose, MdOutlineDone } from "react-icons/md";

import { CircularLoader, CustomButton, OpacityTransition } from "../../Common";
import { useCompleteImportFunctionality, usePlanDetail } from "./hooks";

const useStyles = makeStyles({
  completeContainer: {
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
  mainText: {
    fontSize: "1.1rem",
    fontWeight: 400,
  },
  reviewDetails: {
    margin: "20px 0",
    padding: "0 15px",
  },
  detail: {
    fontWeight: 600,
    lineHeight: "2.5rem",
    "& span": {
      fontWeight: "normal",
      marginLeft: "5px",
    },
  },

  disclaimer: {
    opacity: 0.7,
    fontSize: "0.8rem",
  },
  buttonContainer: {
    marginTop: "30px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
    marginBottom: "5px",
  },

  "@media screen and (min-width:600px) and (max-width:1000px)": {
    completeContainer: {
      width: "90%",
    },
  },

  "@media screen and (max-width:600px)": {
    completeContainer: {
      width: "100%",
    },
  },
});

interface ICompleteImportProps {}

const CompleteImport: React.FC<ICompleteImportProps> = ({}) => {
  const classes = useStyles();

  const { planDetail } = usePlanDetail();

  const { ImportState, organize, tag, onComplete, onCancel, mutationLoading } =
    useCompleteImportFunctionality();
  return (
    <React.Fragment>
      {mutationLoading && <CircularLoader />}
      <OpacityTransition className={classes.completeContainer}>
        <h4 className={classes.headerText}>Review and complete your import</h4>
        <div className={classes.container}>
          <div className={classes.mainText}>
            {ImportState.copyPaste.length} contacts will be added to your
            audience.
          </div>
          <ul className={classes.reviewDetails}>
            <li className={classes.detail}>
              Imported from:<span>{ImportState.type}</span>
            </li>
            {organize.status && (
              <li className={classes.detail}>
                Email marketing status:<span>{organize.status}</span>
              </li>
            )}
            {/* <li className={classes.detail}>
            Update existing contacts:<span>No</span>
          </li> */}
            {tag.selectedTags.length ? (
              <li className={classes.detail}>
                Tagged:
                <span>{tag.selectedTags.join(", ")}</span>
              </li>
            ) : null}
          </ul>
          {planDetail.title && planDetail.contacts && (
            <OpacityTransition className={classes.disclaimer}>
              The maximum number of contacts allowed on your{" "}
              <span style={{ textTransform: "capitalize" }}>
                {planDetail.title}
              </span>{" "}
              plan is <span>{millify(planDetail.contacts)}</span>. If you go
              beyond <span>{millify(planDetail.contacts)}</span> contacts with
              this import, your ability to send email campaigns may be impacted.
            </OpacityTransition>
          )}

          <div className={classes.buttonContainer}>
            <CustomButton
              startIcon={<MdOutlineDone fontSize="1rem" />}
              onClick={onComplete}
            >
              Complete import
            </CustomButton>
            <CustomButton
              startIcon={<MdClose fontSize="1rem" />}
              onClick={onCancel}
              outline
            >
              Cancel import
            </CustomButton>
          </div>
        </div>
      </OpacityTransition>
    </React.Fragment>
  );
};

export default CompleteImport;
