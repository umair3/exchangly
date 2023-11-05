import { makeStyles } from "@mui/styles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import { BiEdit } from "react-icons/bi";
import { BsCode } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { RiDeleteBin3Line } from "react-icons/ri";
import { TiTick } from "react-icons/ti";

import { DeleteIntegration, EditIntegration } from ".";
import { useToggle } from "../../hooks";
import { ISingleIntegrationAPI } from "../../services/Api/Integrations";
import { CustomModal, CustomTooltip } from "../Common";

dayjs.extend(relativeTime);

const useStyles = makeStyles({
  container: {
    width: "100%",
    height: "100%",
    padding: "2em",
    maxWidth: "478px",
    border: "1px solid var(--light20)",
    boxShadow: "1px 0 20px var(--light20)",
    borderRadius: "1em",
    display: "flex",
    flexWrap: "wrap",
    gap: "0.3em",
    lineHeight: 1.2,
    alignItems: "center",
    "& $h5": {
      fontSize: "1.2rem",
      width: "100%",
    },
  },
  icon: {
    alignSelf: "flex-start",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    flexBasis: "100%",
    gap: "0.5em",

    "& h5": {
      fontWeight: "bold",
    },
  },
  edit: {
    marginLeft: "auto",
    alignSelf: "end",
    display: "flex",
    gap: "0.2em",
  },
  editIcon: {
    cursor: "pointer",
    "&:hover": {
      color: "var(--secondary)",
    },
  },
  description: {
    fontSize: "1rem",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "0.2em",
  },
  colorSecondary: {
    fontWeight: "bold",
    color: "var(--secondary)",
  },
  modal: {
    padding: " 2em",
    minWidth: "min(450px,98%)",

    overflow: "auto",
  },
});

interface ISingleIntegrationProps extends Omit<ISingleIntegrationAPI, "key"> {
  keyProp: string;
}

const SingleIntegration: React.FC<ISingleIntegrationProps> = ({
  id,
  title,
  type,
  created,
  updated,
  default: Default,
  host,
  port,
  keyProp,
  passphrase,
}) => {
  const classes = useStyles();
  const [deleteModal, setDeleteModal] = useToggle(false);
  const [editModal, setEditModal] = useToggle(false);

  return (
    <div className={classes.container}>
      <BsCode fontSize={"2rem"} className={classes.icon} />
      <div className={classes.info}>
        {title && <h5>{title}</h5>}

        {type && (
          <div className={classes.description}>
            <span>Type : </span>
            <span className={classes.colorSecondary}>{type}</span>
          </div>
        )}

        {typeof Default === "boolean" && (
          <div className={classes.description}>
            <span> Default Selected: </span>
            <span className={classes.colorSecondary}>
              {Default ? (
                <TiTick fontSize={"1.7rem"} />
              ) : (
                <ImCross fontSize={"0.8rem"} />
              )}
            </span>
          </div>
        )}

        {created && (
          <div className={classes.description}>
            <span>Created at : </span>
            <span className={classes.colorSecondary}>
              {dayjs(created).fromNow()}
            </span>
          </div>
        )}
        {updated && (
          <div className={classes.description}>
            <span>Updated at : </span>
            <span className={classes.colorSecondary}>
              {dayjs(updated).fromNow()}
            </span>
          </div>
        )}
      </div>
      <div className={classes.edit}>
        <CustomTooltip arrow title="Edit">
          <div>
            <BiEdit
              onClick={setEditModal}
              fontSize={"1.7rem"}
              className={classes.editIcon}
            />
          </div>
        </CustomTooltip>
        <CustomModal
          open={editModal}
          handleClose={setEditModal}
          className={classes.modal}
          closeIcon
        >
          <EditIntegration
            closeModal={setEditModal}
            integration={{
              id,
              title,
              type,
              host,
              port,
              key: keyProp,
              passphrase,
              default: Default,
            }}
          />
        </CustomModal>

        <CustomTooltip arrow title="Delete">
          <div>
            <RiDeleteBin3Line
              onClick={setDeleteModal}
              fontSize={"1.7rem"}
              className={classes.editIcon}
            />
          </div>
        </CustomTooltip>
        <CustomModal
          open={deleteModal}
          handleClose={setDeleteModal}
          className={classes.modal}
          closeIcon
        >
          <DeleteIntegration
            id={id}
            closeModal={setDeleteModal}
            title={title}
          />
        </CustomModal>
      </div>
    </div>
  );
};

export default SingleIntegration;
