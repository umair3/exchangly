import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import React from "react";
import { AiFillCheckCircle, AiOutlineArrowUp } from "react-icons/ai";

import { useAccordionStyles } from "../../../hooks";
import { CustomButton } from "../../Common";

interface ICampaignAccordionProps {
  expand: string | false;
  handleChange: (panel: string) => any;
  name: string;
  placeholder: string;
  value?: string;

  title: string;
  buttonName: string;
  buttonIcon?: JSX.Element;
}

const CampaignAccordion: React.FC<ICampaignAccordionProps> = ({
  expand,
  handleChange,
  name,
  value,
  children,
  placeholder,
  buttonIcon,
  title,
  buttonName,
}) => {
  const styles = useAccordionStyles();
  return (
    <Accordion
      expanded={expand === name}
      onChange={handleChange(name)}
      classes={{ root: styles.accordion }}
    >
      <AccordionSummary aria-controls={name} id={name}>
        <div className={styles.accordionSummary}>
          <AiFillCheckCircle
            className={`${styles.icon} ${value && styles.iconOpacity}`}
            fontSize={"1.2rem"}
          />
          <h3 className={styles.mainTitle}>{title}:</h3>
          <div className={styles.placeholder}>
            {value ? value : placeholder}
          </div>
          {(!expand || expand !== name) && (
            <div className={styles.buttonContainer}>
              <CustomButton startIcon={buttonIcon} className={styles.button}>
                {buttonName}
              </CustomButton>
            </div>
          )}

          {expand === name && (
            <AiOutlineArrowUp
              className={styles.arrowUpIcon}
              fontSize={"1.4rem"}
            />
          )}
        </div>
      </AccordionSummary>

      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default CampaignAccordion;
