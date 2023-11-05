import { Menu, MenuItem } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@mui/styles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { IoIosOptions } from "react-icons/io";

import { useCampaignActions } from "../../features/campaign";

import { useMenu, useToggle } from "../../hooks";
import { CustomModal } from "../Common";
import DeleteCampaign from "./DeleteCampaign";
import ExecuteCampaign from "./ExecuteCampaign";
import { ViewEnum } from "./View";

dayjs.extend(relativeTime);

const useStyles = makeStyles({
  item: {
    width: "100%",

    padding: "1em",
    cursor: "pointer",
    transition: "0.2s all linear",
    border: "1px solid var(--light50)",
    boxShadow: "10px 10px 20px var(--light50)",
    borderRadius: "1em",

    "&:hover": {
      backgroundColor: "var(--light50)!important",
      boxShadow: "none",
    },
  },
  icon: {
    alignSelf: "flex-start",
    color: "var(--secondary)",
  },
  detail: {
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",
    width: "100%",
  },
  wrapper: {
    display: "flex",
    gap: "1rem",
    width: "100%",
    flexWrap: "wrap",
  },
  title: {
    color: "var(--secondary)",
    fontSize: "1.2rem",

    lineHeight: 1.4,

    fontWeight: "bold",
  },
  actions: {
    marginLeft: "auto",
  },

  iconButton: {
    color: "var(--primary)",
  },
  description: {
    display: "flex",
    flexDirection: "column",
    gap: "0.2em",
  },
  actDetail: {
    fontSize: "1rem",

    display: "flex",
    flexDirection: "column",
    justifySelf: "flex-end",
    gap: "0.5em",
  },
  span: {
    marginInline: "0.2em",
  },
  menu: {
    backgroundColor: "var(--secondary)!important",
    color: "var(--light)!important",
  },
});

export interface IListItemProps {
  title: string;
  id: number;
  created: string;
  updated: string;
}

const ListItem: React.FC<IListItemProps> = ({
  title,

  id,

  updated,
  created,
}) => {
  const classes = useStyles();
  const [showDeleteModal, setDeleteModal] = useToggle(false);
  const [showExecuteModal, setExecuteModal] = useToggle(false);

  const { anchorEl, open, handleClick, handleClose } = useMenu();
  const { changeTab, changeCampaign } = useCampaignActions();

  const setExecutionView = () => {
    changeCampaign(String(id));
    changeTab(ViewEnum.EXECUTION_VIEW);
  };
  return (
    <React.Fragment>
      <div className={classes.item}>
        <div className={classes.detail}>
          <div className={classes.wrapper}>
            <div className={classes.icon}>
              <AiOutlineMail fontSize={"1.6rem"} />
            </div>
            <div className={classes.description}>
              <h4 className={classes.title}>{title}</h4>
              <div className={classes.actDetail}>
                <div>
                  Added{" "}
                  <span className={classes.span}>
                    {dayjs(created).fromNow()}
                  </span>
                </div>
                <div>
                  {" "}
                  Updated
                  <span className={classes.span}>
                    {dayjs(updated).fromNow()}
                  </span>
                </div>
              </div>
            </div>

            <div className={classes.actions}>
              <IconButton
                onClick={handleClick}
                aria-label="options"
                component="span"
                classes={{ root: classes.iconButton }}
              >
                <IoIosOptions />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        classes={{ paper: classes.menu }}
      >
        <MenuItem onClick={setExecutionView}>Show Execution View</MenuItem>
        <MenuItem onClick={setExecuteModal}>
          Execute this Campaign ({title})
        </MenuItem>
        <MenuItem onClick={setDeleteModal}>
          Delete this campaign ({title})
        </MenuItem>
        <MenuItem className="pointer-events-none ">
          Schedule Campaign (upcoming)
        </MenuItem>
      </Menu>
      <CustomModal
        open={showDeleteModal}
        handleClose={setDeleteModal}
        className="!p-8 max-w-md overflow-auto"
        style={{ width: "min(500px,98%)" }}
        closeIcon
      >
        <DeleteCampaign closeModal={setDeleteModal} title={title} id={id} />
      </CustomModal>

      <CustomModal
        open={showExecuteModal}
        handleClose={setExecuteModal}
        className="!p-8 max-w-md overflow-auto"
        style={{ width: "min(450px,98%)" }}
        closeIcon
      >
        <ExecuteCampaign closeModal={setExecuteModal} title={title} id={id} />
      </CustomModal>
    </React.Fragment>
  );
};

export default ListItem;
