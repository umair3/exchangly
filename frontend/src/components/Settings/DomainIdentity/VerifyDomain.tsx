import { makeStyles } from "@mui/styles";
import React, { useCallback } from "react";

import { DKIM, DomainFooter, DomainHeader, EditDomain, SPF } from ".";
import { useToggle } from "../../../hooks";
import { IDomainIdentity } from "../../../services/Api/DomainIdentity";
import { CustomModal } from "../../Common";

const useStyles = makeStyles({
  description: {
    fontWeight: "bold",
    opacity: 0.8,
  },

  wrapper: {
    display: "flex",
    border: "1px solid var(--light50)",
    borderRadius: "1em",
    gap: "0.5em",
    flexWrap: "wrap",
    position: "relative",
  },
  spfdkimContainer: {
    flex: "1 1 45%",
    alignSelf: "stretch",
    minWidth: "min(100%,400px)",
    padding: "1em",
    display: "flex",
    flexDirection: "column",
    gap: "1em",
  },
  headingText: {
    fontWeight: "bold",
    backgroundColor: "var(--light50)",
    padding: "0.5em",
    borderRadius: "1em",
    fontSize: "1.1rem",
    textAlign: "center",
    width: "100%",
  },
  footer: {
    marginTop: "2vmin",
  },
  modal: {
    padding: " 2em",
    minWidth: "min(450px,98%)",
    top: "40%",
  },
});

interface IVerifyDomainProps {
  domain: null | IDomainIdentity;
}

const VerifyDomain: React.FC<IVerifyDomainProps> = ({ domain }) => {
  const classes = useStyles();
  const [showEditModal, setEditModal] = useToggle(false);

  const onEdit = useCallback(() => {
    setEditModal();
  }, [setEditModal]);

  return (
    <React.Fragment>
      <DomainHeader host={domain?.name || ""} onEdit={onEdit} />
      <p className={classes.description}>
        You are one step closer to authenticating your domain and improving
        email deliverability.
      </p>
      <div className={classes.wrapper}>
        <div className={classes.spfdkimContainer}>
          <h4 className={classes.headingText}>SPF</h4>
          <SPF
            hostname={domain?.name || ""}
            spfTxtRecord={domain?.spf_txt_record || ""}
            verified={domain?.spf_verified || false}
          />
        </div>
        <div className={classes.spfdkimContainer}>
          <h4 className={classes.headingText}>DKIM</h4>
          <DKIM
            hostname={domain?.name || ""}
            dkimTxtRecord={domain?.dkim_txt_record || ""}
            dkimSubdomain={domain?.dkim_subdomain || ""}
            verified={domain?.dkim_verified || false}
          />
        </div>
      </div>
      <div className={classes.footer}>
        <DomainFooter />
      </div>

      <CustomModal
        open={showEditModal}
        handleClose={onEdit}
        className={classes.modal}
        closeIcon
      >
        <EditDomain
          closeModal={onEdit}
          domain={domain?.name || ""}
          id={domain?.id!}
        />
      </CustomModal>
    </React.Fragment>
  );
};

export default VerifyDomain;
