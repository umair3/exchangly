import React from "react";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

import { paths } from "../../services/AppRoutes/paths";
import { CommonHeroSection, CustomButton } from "../Common";

interface IHeroSectionCampaignProps {
  title: string;
  description: string;
}

const HeroSectionCampaign: React.FC<IHeroSectionCampaignProps> = ({
  title,
  description,
}) => {
  const navigate = useNavigate();
  return (
    <CommonHeroSection
      Icon={HiOutlineSpeakerphone}
      mainHeader={title}
      description={description}
    >
      {(styles) => (
        <div className={styles.buttonContainer}>
          <CustomButton
            onClick={() => navigate(paths.createCampaign)}
            startIcon={<AiOutlineAppstoreAdd fontSize="1rem" />}
          >
            Create Campaign
          </CustomButton>

          {/* <CustomButton startIcon={<CgTemplate fontSize="1rem" />}>
            Check Templates
          </CustomButton> */}
        </div>
      )}
    </CommonHeroSection>
  );
};

export default HeroSectionCampaign;
