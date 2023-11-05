import { makeStyles } from "@mui/styles";
import React from "react";
import { BiHelpCircle } from "react-icons/bi";
import { BsFillPatchCheckFill } from "react-icons/bs";

import { ClipboardInput, CustomButton, CustomTooltip } from "../../Common";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "1em",
    fontSize: "0.9rem",
    fontWeight: "bold",
    opacity: 0.9,
    paddingInline: "0.4em",
    position: "relative",
  },
  helpContainer: {
    display: "flex",
    alignItems: "center",
    gap: "0.5em",
  },
  icon: {
    cursor: "pointer",
  },
  clipboardContainer: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "0.4em",
  },
  clipboardInput: {
    flex: "1 1 60%",
    minWidth: "min(100%,400px)",
  },
  description: {
    fontStyle: "italic",
    lineHeight: 1.8,
  },
});

interface ISPFProps {
  hostname: string;
  spfTxtRecord: string;
  verified: boolean;
}

const SPF: React.FC<ISPFProps> = ({ hostname, spfTxtRecord, verified }) => {
  const classes = useStyles();

  const recordArray = spfTxtRecord.split("~all")[0].trim().split(" ");

  return (
    <div className={classes.container}>
      <div>
        Copy the SPF record shown below and publish it in your domain DNS.
      </div>
      <div className={classes.helpContainer}>
        <div> Steps to setup SPF</div>

        <CustomTooltip title="Update Later" arrow>
          <div>
            <BiHelpCircle className={classes.icon} fontSize="1.2rem" />
          </div>
        </CustomTooltip>
      </div>
      <div>
        Host name to add <span>{hostname}</span>
      </div>
      <div className={classes.clipboardContainer}>
        <div>TXT Record to add</div>
        <div className={classes.clipboardInput}>
          <ClipboardInput value={spfTxtRecord} />
        </div>
      </div>
      {spfTxtRecord && (
        <div className={classes.description}>
          If you have an existing SPF record for your domain, add
          {recordArray[1]} after {recordArray[0]} and it looks like{" "}
          {recordArray.join(" ")}
        </div>
      )}

      {verified && (
        <div className="flex mt-4 gap-2 items-center font-bold text-secondary bg-secondary/5 px-4 py-1 rounded-2xl text-lg ml-auto">
          <p>Verified</p>
          <BsFillPatchCheckFill />
        </div>
      )}

      {!verified && (
        <div className="ml-auto mt-4 ">
          <CustomButton outline>Verify SPF</CustomButton>
        </div>
      )}
    </div>
  );
};

export default SPF;
