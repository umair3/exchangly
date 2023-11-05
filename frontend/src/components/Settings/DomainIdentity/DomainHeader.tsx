import { makeStyles } from "@mui/styles";
import React from "react";
import { FaRegEdit } from "react-icons/fa";

import { CustomTooltip } from "../../Common";

const useStyles = makeStyles({
  header: {
    width: "100%",
    borderBottom: "1px solid var(--secondary)",
    paddingBlock: "1em",
    display: "flex",
    gap: "0.6em",
    flexWrap: "wrap",
    alignItems: "center",
  },
  headingText: {
    color: "var(--secondary)",
    textShadow: "0px 0px 1px var(--secondary)",
    fontSize: "1.3rem",
    fontWeight: "bold",
  },
  icon: {
    color: "var(--secondary)",
    cursor: "pointer",

    "&:hover": {
      filter: "brightness(150%)",
    },
  },
  iconContainer: {
    marginRight: "auto",
  },
  "@media screen and (max-width:700px)": {
    iconContainer: {
      marginLeft: "auto",
      marginRight: 0,
    },
  },
});

interface IDomainHeaderProps {
  host: string;
  onEdit?: () => void;
}

const DomainHeader: React.FC<IDomainHeaderProps> = ({ host, onEdit }) => {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <h3 className={classes.headingText}>
        SPF/DKIM Setup for <span>{host}</span>
      </h3>

      <CustomTooltip arrow title={<h3>Edit {host}</h3>}>
        <div className={classes.iconContainer}>
          <FaRegEdit
            fontSize="1.4rem"
            className={classes.icon}
            onClick={onEdit}
          />
        </div>
      </CustomTooltip>
    </div>
  );
};

export default DomainHeader;
