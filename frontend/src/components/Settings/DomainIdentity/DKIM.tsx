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
  },
  helpContainer: {
    display: "flex",
    alignItems: "center",
    gap: "0.5em",
  },
  icon: {
    cursor: "pointer",
  },
  hostStyles: {
    backgroundColor: "var(--secondary50)",
    padding: "0.2em 0.5em ",
    borderRadius: "1em",
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
});

interface IDKIMProps {
  hostname: string;
  dkimTxtRecord: string;
  dkimSubdomain: string;
  verified: boolean;
}

const DKIM: React.FC<IDKIMProps> = ({
  hostname,
  dkimSubdomain,
  dkimTxtRecord,
  verified,
}) => {
  const classes = useStyles();

  const hostNameToAdd = `${dkimSubdomain}.${hostname}`;

  return (
    <div className={classes.container}>
      <div>
        Copy the DKIM record shown below and publish it in your domain DNS.
      </div>
      <div className={classes.helpContainer}>
        <div> Steps to setup DKIM</div>

        <CustomTooltip title="Update Later" arrow>
          <div>
            <BiHelpCircle className={classes.icon} fontSize="1.2rem" />
          </div>
        </CustomTooltip>
      </div>
      {hostname && dkimSubdomain && (
        <div>
          Host name to add{" "}
          <span className={classes.hostStyles}>{hostNameToAdd}</span>
        </div>
      )}
      <div className={classes.clipboardContainer}>
        <div>TXT Record to add</div>
        <div className={classes.clipboardInput}>
          <ClipboardInput value={dkimTxtRecord} />
        </div>
      </div>

      {verified && (
        <div className="flex mt-4 gap-2 items-center font-bold text-secondary bg-secondary/5 px-4 py-1 rounded-2xl text-lg ml-auto">
          <p>Verified</p>
          <BsFillPatchCheckFill />
        </div>
      )}

      {!verified && (
        <div className="ml-auto mt-4">
          <CustomButton outline>Verify DKIM</CustomButton>
        </div>
      )}
    </div>
  );
};

export default DKIM;
