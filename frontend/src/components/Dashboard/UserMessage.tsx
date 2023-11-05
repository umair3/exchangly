import { makeStyles } from "@mui/styles";
import React from "react";
import { RiUserFill } from "react-icons/ri";

const useStyles = makeStyles({
  message: {
    fontSize: "min(6vw,1.7rem)",
    display: "flex",
    alignItems: "center",
    gap: "0.1em",
    letterSpacing: "0.045em",
    marginBottom: "1em",
    textShadow: "0px 0px 1px var(--secondary)",
    color: "var(--secondary)",
    maxWidth: "100%",
  },

  icon: {
    marginTop: "0.2em",
    marginLeft: "0.2em",
    color: "var(--secondary)",
  },
});

interface IUserMessageProps {
  username: string;
}

const UserMessage: React.FC<IUserMessageProps> = ({ username }) => {
  const classes = useStyles();

  if (!username) {
    return null;
  }
  return (
    <div className={classes.message}>
      <div> Hello,</div>
      <div className="md:px-1">{username}</div>
      <div className={`${classes.icon} flex-none `}>
        <RiUserFill />
      </div>
    </div>
  );
};

export default UserMessage;
