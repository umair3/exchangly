import React from "react";
import { CgTemplate } from "react-icons/cg";
import { RiUserAddFill } from "react-icons/ri";
import {
  CommonHeroSection,
  CustomButton,
  OpacityTransition,
  PageTransitions,
  TitleHeader,
} from "../../components/Common";
import TopBar, { ITopBarProps } from "../../components/Common/TopBar";
import {
  EmailTemplates,
  UserDefinedTemplates,
} from "../../components/Templates";
import { paths } from "../../services/AppRoutes/paths";

const topBarProps: ITopBarProps = {
  links: [{ name: "Templates" }],
};

function TemplateDetailPage(): React.ReactElement {
  return (
    <React.Fragment>
      <TopBar links={topBarProps.links} />

      <CommonHeroSection
        Icon={CgTemplate}
        mainHeader="Manage your email templates"
        description="User templates is where you'll store and manage your templates.Once you add your template, you'll be able to use these in your campaign.We'll walk you through the process."
      >
        {(styles) => (
          <div className={styles.buttonContainer}>
            <CustomButton
              type="link"
              href={paths.addTemplate}
              startIcon={<RiUserAddFill fontSize={"1rem"} />}
            >
              Add Template
            </CustomButton>
          </div>
        )}
      </CommonHeroSection>

      <PageTransitions>
        <OpacityTransition>
          <UserDefinedTemplates />
        </OpacityTransition>

        <div className="mt-4">
          <OpacityTransition>
            <EmailTemplates />
          </OpacityTransition>
        </div>
      </PageTransitions>
    </React.Fragment>
  );
}

export default TemplateDetailPage;
