import { makeStyles } from "@mui/styles";
import React from "react";
import { IconType } from "react-icons/lib";
import {
  MdCampaign,
  MdDashboard,
  MdIntegrationInstructions,
  MdOutlineMotionPhotosAuto,
  MdTimeline,
} from "react-icons/md";
import { CgTemplate } from "react-icons/cg";

import { Link, NavLink } from "react-router-dom";

import { AccountMenu } from ".";
import { paths } from "../../services/AppRoutes/paths";
import CustomTooltip from "./CustomTooltip";

const useStyles = makeStyles({
  navbar: {
    position: "fixed",
    backgroundImage: "var(--gradient)",
    transition: "width 600ms ease",
    zIndex: 1200,
    borderRightRadius: "5px",
    boxShadow: "2px -4px 13px -8px rgba(0,0,0,0.72)",

    "&:hover": {
      "& $logoIcon": {
        transform: "rotate(-360deg)",
      },
    },
  },

  navbarNav: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },

  navItem: {
    width: "100%",

    "&:last-child": {
      marginTop: "auto",
    },
  },

  navLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "5rem",
    color: "var(--light50)",
    textDecoration: "none",
    filter: "grayscale(100%) opacity(0.8)",
    transition: "600ms",

    "&:hover": {
      filter: "grayscale(0%) opacity(0.9)",
      background: " var(--secondary)",
      color: "var(--light)",
    },
  },

  icon: {
    width: "3rem",
    minWidth: "2rem",

    transition: "600ms",
    fontSize: "32px!important",
  },

  logo: {
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: "1rem",
    textAlign: "center",

    fontSize: "1.5rem",
    letterSpacing: "0.3ch",
    width: "100%",
  },
  activeLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "5rem",

    textDecoration: "none",

    transition: "600ms",
    filter: "grayscale(0%) opacity(1)",
    background: " var(--secondary)",
    color: "var(--light)",
    boxShadow: "2px -4px 13px -8px rgba(0,0,0,0.72)",
  },

  logoIcon: {
    transform: "rotate(0deg)",
    transition: "500ms !important",
    color: " var(--light)",
  },

  defaultColor: {
    background: "transparent",

    "&:hover": {
      background: "transparent!important",
    },
  },

  "@media only screen and (min-width: 600px)": {
    navbar: {
      top: 0,
      width: "5rem",
      height: "100vh",
    },
  },
  "@media only screen and (max-width: 600px)": {
    navbar: {
      bottom: 0,
      width: "100vw",
      height: "5rem",
    },
    logo: {
      display: "none",
    },

    navbarNav: {
      flexDirection: "row",
    },

    navLink: {
      justifyContent: "center",
    },
    activeLink: {
      justifyContent: "center",
    },
  },
});

interface ISidebarProps {}

type Item = {
  SideIcon: IconType;
  path: string;
  text: string;
};

const Sidebar: React.FC<ISidebarProps> = (props) => {
  const classes = useStyles();

  const items: Item[] = [
    {
      SideIcon: MdDashboard,
      path: paths.dashboard,
      text: "Dashboard",
    },

    {
      SideIcon: MdOutlineMotionPhotosAuto,
      path: paths.audience,
      text: "Audience",
    },
    {
      SideIcon: CgTemplate,
      path: paths.templates,
      text: "Templates",
    },

    {
      SideIcon: MdCampaign,
      path: paths.campaign,
      text: "Campaign",
    },

    {
      SideIcon: MdTimeline,
      path: paths.userJourney,
      text: "User Journey",
    },
  ];

  return (
    <nav className={classes.navbar}>
      <ul className={classes.navbarNav}>
        <li className={classes.logo}>
          <Link to="/" className={`${classes.navLink} ${classes.defaultColor}`}>
            <h3 className={`${classes.icon} ${classes.logoIcon}`}>M</h3>
          </Link>
        </li>

        {React.Children.toArray(
          items.map(({ SideIcon, text, path }) => (
            <li className={classes.navItem}>
              <NavLink
                to={path}
                className={(navData) =>
                  navData.isActive ? classes.activeLink : classes.navLink
                }
              >
                <CustomTooltip title={text}>
                  <div>
                    <SideIcon className={classes.icon} />
                  </div>
                </CustomTooltip>
              </NavLink>
            </li>
          ))
        )}

        <li className={`${classes.navItem} ${classes.navLink}`}>
          <AccountMenu />
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
