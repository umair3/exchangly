import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";
import React from "react";
import { AiOutlineTeam } from "react-icons/ai";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import { CgBrowser } from "react-icons/cg";
import { IoLogOut, IoShareSocialSharp } from "react-icons/io5";
import {
  MdMarkEmailRead,
  MdOutlineIntegrationInstructions,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { CircularLoader } from ".";
import { useAppSelector } from "../../app/hooks";
import { useMenu } from "../../hooks";
import { useLogout } from "../../services/Api/User/hooks";

import { paths } from "../../services/AppRoutes/paths";
import CustomTooltip from "./CustomTooltip";

const useStyles = makeStyles({
  menu: {
    padding: "0.5em",
    backgroundColor: "var(--primary)!important",
    color: "var(--light50)!important",
  },
  icon: {
    color: "var(--light50)!important",
    marginRight: "0.2em",
  },
});

interface IAccountMenuProps {}

const AccountMenu: React.FC<IAccountMenuProps> = (props) => {
  const classes = useStyles();
  const { anchorEl, open, handleClick, handleClose } = useMenu();
  const navigate = useNavigate();
  const { logout, loading } = useLogout();

  const { profile } = useAppSelector((state) => state.user);

  return (
    <React.Fragment>
      {loading && <CircularLoader />}
      <CustomTooltip title="Account Settings">
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              backgroundColor: "var(--primary)",
              color: "var(--light)",
              fontWeight: "bold",
              outline: "3px dashed var(--light50)",
            }}
          >
            {(profile &&
              "email" in profile &&
              profile.email.charAt(0).toUpperCase()) ||
              "M"}
          </Avatar>
        </IconButton>
      </CustomTooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        classes={{ paper: classes.menu }}
      >
        {/* <MenuItem onClick={() => navigate(paths.integrations)}>
          <ListItemIcon>
            <MdOutlineIntegrationInstructions className={classes.icon} />
          </ListItemIcon>
          Integrations
        </MenuItem> */}

        <MenuItem onClick={() => navigate(paths.domainIdentity)}>
          <ListItemIcon>
            <CgBrowser className={classes.icon} />
          </ListItemIcon>
          Check Domain Identity
        </MenuItem>
        <MenuItem onClick={() => navigate(paths.emailsIdentity)}>
          <ListItemIcon>
            <MdMarkEmailRead className={classes.icon} />
          </ListItemIcon>
          Show Email Identities
        </MenuItem>

        <MenuItem onClick={() => navigate(paths.teams)}>
          <ListItemIcon>
            <AiOutlineTeam className={classes.icon} />
          </ListItemIcon>
          Manage Teams
        </MenuItem>

        <MenuItem onClick={() => navigate(paths.socialIntegrations)}>
          <ListItemIcon>
            <IoShareSocialSharp className={classes.icon} />
          </ListItemIcon>
          Social Integrations
        </MenuItem>

        <MenuItem onClick={() => navigate(paths.plansAndBilling)}>
          <ListItemIcon>
            <BsFillCreditCard2FrontFill className={classes.icon} />
          </ListItemIcon>
          Plans and Billing
        </MenuItem>

        <MenuItem onClick={logout}>
          <ListItemIcon>
            <IoLogOut className={classes.icon} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default AccountMenu;
