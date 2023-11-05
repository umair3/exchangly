import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { makeStyles } from "@mui/styles";
import React from "react";
import { ImCross } from "react-icons/im";
import { motion } from "framer-motion";
import OpacityTransition from "./OpacityTransition";

const useStyles = makeStyles({
  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100%",

    backgroundColor: "rgba(0, 0, 0, 0.5)!important",
  },
  box: {
    position: "fixed",
    top: "50%",
    left: "50%",
    height: "auto",
    transform: "translate(-50%, -50%)",
    padding: "0.4em",
    border: "5px solid var(--primary)",
    // boxShadow: "5px 5px 3px 2px rgba(0,0,0,0.2)",
    boxShadow: "1px 1px 8px var(--primary)",
    borderRadius: "1em",
    outline: "none",
    backgroundColor: "var(--light50)",
    transition: "all 0.3s ease-in-out",
    maxHeight: "95%",
    maxWidth: "800px",
  },
  icon: {
    cursor: "pointer",
    position: "absolute",
    right: "5%",
    opacity: 0.5,
    "&:hover": {
      color: "var(--secondary)",
      opacity: 1,
    },
  },
});

interface ICustomModalProps {
  open: boolean;
  handleOpen?: () => void;
  handleClose?: () => void;
  children: React.ReactElement;
  className?: string;
  closeIcon?: boolean;
  backdropClose?: boolean;
  removePreviousClassStyles?: boolean;
  style?: React.CSSProperties;
}

const CustomModal: React.FunctionComponent<ICustomModalProps> = ({
  open,
  handleOpen,
  handleClose,
  className,
  children,
  closeIcon = false,
  backdropClose = true,
  removePreviousClassStyles = false,
  style,
}) => {
  const classes = useStyles();

  const classNames = [
    removePreviousClassStyles ? "" : classes.box,
    className ? className : "",
  ].join(" ");

  return (
    <Modal
      disableEnforceFocus
      open={open}
      onClose={backdropClose ? handleClose : undefined}
      BackdropProps={{ classes: { root: classes.backdrop } }}
    >
      <Box
        className={classNames}
        component={motion.div}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={style}
      >
        {closeIcon && (
          <ImCross className={classes.icon} onClick={handleClose} />
        )}
        <OpacityTransition>{children}</OpacityTransition>
      </Box>
    </Modal>
  );
};

export default CustomModal;
