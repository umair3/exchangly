import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { makeStyles } from "@mui/styles";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  header: {
    width: "100%",
    position: "sticky",
    backgroundImage: "var(--gradient)",
    color: "var(--light)",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: "80px",
    zIndex: 100,
    transition: "600ms all ease-in",
    wordSpacing: "4px",
    boxShadow: "2px -4px 13px -8px rgba(0,0,0,0.72)",
    display: "flex",
    alignItems: "center",
  },
  link: {
    margin: "0 10px",
    textDecoration: "none",
    color: "var(--light)",
    textTransform: "capitalize",
  },
  forwardIcon: {
    fontSize: "1.3rem",
  },
});

interface ILink {
  name: string;
  path?: string;
}

export interface ITopBarProps {
  links: ILink[];
}

const styles = {
  link: "text-base sm:text-xl",
};

const TopBar: React.FC<ITopBarProps> = ({ links }) => {
  const classes = useStyles();

  const renderLinks = useMemo(() => {
    if (!links.length) return null;
    else if (links.length === 1) {
      return links[0].path ? (
        <Link className={`${classes.link} ${styles.link}`} to={links[0].path}>
          {links[0].name}
        </Link>
      ) : (
        <div className={`${classes.link} ${styles.link}`}>{links[0].name}</div>
      );
    } else {
      return React.Children.toArray(
        links.map(({ name, path }, index, elements) => (
          <>
            {path ? (
              <Link className={`${classes.link} ${styles.link}`} to={path}>
                {name}
              </Link>
            ) : (
              <div className={`${classes.link} ${styles.link}`}>{name}</div>
            )}

            {elements[index + 1] ? (
              <ArrowForwardIosIcon className={classes.forwardIcon} />
            ) : null}
          </>
        ))
      );
    }
  }, []);

  return <header className={`${classes.header} md:pl-4`}>{renderLinks}</header>;
};

export default TopBar;
