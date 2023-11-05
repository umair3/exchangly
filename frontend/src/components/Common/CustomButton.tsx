import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import React, { useMemo } from "react";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  button: {
    backgroundColor: "var(--secondary)!important",
    borderRadius: "2em!Important",
    color: "var(--light)",
    minWidth: "max-content",

    "&:hover": {
      filter: "brightness(110%)",
    },
  },

  outline: {
    backgroundColor: "transparent!important",
    border: "2px solid var(--secondary)!important",

    color: "var(--secondary)!important",
    "&:hover": {
      backgroundColor: "var(--secondary)!important",
      color: "var(--light)!important",
    },
  },

  disabled: {
    pointerEvents: "none",
    opacity: 0.7,
  },
});

interface ICustomButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  outline?: boolean;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  className?: string;
  href?: string;
  type?: "button" | "link";
  icon?: "add" | "cancel" | "random";
}

const CustomButton: React.FunctionComponent<ICustomButtonProps> = ({
  children,
  onClick,
  disabled = false,
  outline,
  style,
  startIcon,
  endIcon,
  className,
  type = "button",
  href,
  icon = "random",
}) => {
  const classes = useStyles();

  const classNames = [
    classes.button,
    outline ? classes.outline : "",
    disabled ? classes.disabled : "",
    className,
  ].join(" ");

  const renderLinkProps = useMemo(() => {
    if (type === "link") {
      return { to: href, component: Link };
    }
    return {};
  }, []);

  const displayIcon = useMemo(() => {
    switch (icon) {
      case "add":
        return <AiOutlineAppstoreAdd />;
      case "cancel":
        return <MdClose />;

      case "random":
        return startIcon;
    }
  }, []);

  return (
    <Button
      variant="contained"
      color="primary"
      className={classNames}
      onClick={onClick}
      style={{ textTransform: "capitalize", ...style }}
      startIcon={displayIcon}
      endIcon={endIcon}
      disableRipple
      {...renderLinkProps}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
