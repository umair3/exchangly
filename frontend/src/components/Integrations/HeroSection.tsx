import React from "react";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { MdOutlineIntegrationInstructions } from "react-icons/md";

import { CommonHeroSection, CustomButton } from "../Common";

interface IHeroSectionProps {
  onButtonClick?: () => void;
}

const HeroSection: React.FC<IHeroSectionProps> = ({ onButtonClick }) => {
  return (
    <CommonHeroSection
      Icon={MdOutlineIntegrationInstructions}
      mainHeader="Get it all connected"
      description="Integrations connect your account to the apps and tools you already
            use.That makes marketing easier"
    >
      {(styles) => (
        <div className={styles.buttonContainer}>
          <CustomButton
            startIcon={<AiOutlineAppstoreAdd />}
            onClick={onButtonClick}
          >
            Add new integration
          </CustomButton>
        </div>
      )}
    </CommonHeroSection>
  );
};

export default React.memo(HeroSection);
