import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { RiUserAddFill } from "react-icons/ri";

import { CustomButton } from "../../components/Common";
import { CommonHeroSection } from "../Common";

interface IBannerProps {
  header: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}

const Banner: React.FC<IBannerProps> = ({
  header,
  description,
  buttonText,
  onClick,
}) => {
  return (
    <CommonHeroSection
      Icon={AiOutlineMail}
      mainHeader={header}
      description={description}
    >
      {(styles) => (
        <div className={styles.buttonContainer}>
          <CustomButton
            startIcon={<RiUserAddFill fontSize={"1rem"} />}
            onClick={onClick}
          >
            {buttonText}
          </CustomButton>
        </div>
      )}
    </CommonHeroSection>
  );
};

export default Banner;
