import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React from "react";
import { AiOutlineArrowDown } from "react-icons/ai";
import { MdOutlineMarkEmailRead } from "react-icons/md";

import { useAccordionStyles } from "../../../hooks";

interface ILogsAccordionProps {
  title: string;
  description?: string;
  titleClassName?: string;
  iconClassName?: string;
  expanded?: boolean;
  unmountOnExit?: boolean;
}

const LogsAccordion: React.FC<ILogsAccordionProps> = ({
  description,
  title,
  children,
  titleClassName,
  iconClassName,
  expanded = false,
  unmountOnExit = true,
}) => {
  const styles = useAccordionStyles();

  return (
    <Accordion
      TransitionProps={{ unmountOnExit }}
      classes={{ root: styles.accordion }}
      defaultExpanded={expanded}
    >
      <AccordionSummary
        aria-controls={description && description}
        id={title}
        expandIcon={
          <AiOutlineArrowDown
            fontSize="1.5rem"
            className={iconClassName && iconClassName}
          />
        }
      >
        <div className={styles.accordionSummary}>
          <MdOutlineMarkEmailRead
            className={`${styles.icon} ${iconClassName && iconClassName}`}
            fontSize={"1.2rem"}
            style={{ opacity: 1 }}
          />
          <h3
            className={`${styles.mainTitle} ${
              titleClassName && titleClassName
            }`}
            style={{ fontSize: "1rem" }}
          >
            {title}:
          </h3>
          <div className={styles.placeholder}>{description && description}</div>
        </div>
      </AccordionSummary>

      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default LogsAccordion;
