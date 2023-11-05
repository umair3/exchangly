import React, { useEffect, useMemo, useState } from "react";

import { BsArrowUpCircle } from "react-icons/bs";

import { useAppSelector } from "../../../app/hooks";

import {
  CampaignContainer,
  CampaignStepper,
  Content,
  From,
  Name,
  Subject,
  To,
} from "../../../components/Campaign/CreateCampaign";
import { useCampaignStepper } from "../../../components/Campaign/CreateCampaign/hooks";
import {
  CircularLoader,
  CustomButton,
  PageTransitions,
  SimpleLoader,
  TopBar,
} from "../../../components/Common";
import { ITopBarProps } from "../../../components/Common/TopBar";
import { useCampaignActions } from "../../../features/campaign";
import { useNavigation } from "../../../hooks";
import {
  useAudienceList,
  useFetchTags,
} from "../../../services/Api/Audience/hooks";
import { useCreateCampaign } from "../../../services/Api/Campaign/hooks";
import { useEmailIdentities } from "../../../services/Api/EmailIdentity/hooks";
import { paths } from "../../../services/AppRoutes/paths";
import { useCreateCampaignPageStyles } from "./useCreateCampaignPageStyles";

const topBarProps: ITopBarProps = {
  links: [
    { name: "Campaign ", path: paths.campaign },
    { name: "Create Campaign ", path: paths.createCampaign },
  ],
};

enum CampaignSteps {
  CONTENT = 0,
  TO = 1,
  FROM = 2,
  SUBJECT = 3,
}

function CreateCampaignPage(): React.ReactElement {
  const classes = useCreateCampaignPageStyles();
  const [audienceCount, setAudienceCount] = useState<number>(0);
  const { activeStep, handleNext, handleBack, complete, changeComplete } =
    useCampaignStepper(CampaignSteps.CONTENT);
  const { goBack } = useNavigation();
  const { isLoading: audienceLoading, isFetching: audienceFetching } =
    useAudienceList(1, (response) => setAudienceCount(response.data.count));
  const { identities, isLoading: identitiesLoading } = useEmailIdentities({
    currentPage: 1,
  });

  const { recipientTags, senderEmail, subject, template, previewText, title } =
    useAppSelector((state) => state.campaign.createCampaign);

  const { resetCreateCampaignState } = useCampaignActions();

  const { tags } = useFetchTags();

  const { createCampaign, isLoading } = useCreateCampaign();

  const recipientIds = useMemo(() => {
    return recipientTags.map((recipient) => parseInt(recipient.value));
  }, [recipientTags]);

  useEffect(() => {
    return () => {
      resetCreateCampaignState();
    };
  }, []);

  const onCreate = () => {
    createCampaign({
      recipientIds,
      senderEmail,
      subject,
      template,
      previewText,
      title,
    });
  };

  const campaignToValue = useMemo(() => {
    if (!recipientTags.length) {
      return "No tags selected for this campaign";
    }
    return `${recipientTags
      .map((recipient) => recipient.label)
      .join(",")} [Tags]`;
  }, [recipientTags]);

  const campaignFromValue = useMemo(() => {
    return senderEmail ? senderEmail : "No email is selected for this campaign";
  }, [senderEmail]);

  const campaignSubjectValue = useMemo(() => {
    return subject ? subject : "Add subject line for this campaign";
  }, [subject]);

  const isComplete = useMemo(() => {
    if (activeStep !== CampaignSteps.SUBJECT + 1 || !complete) {
      return false;
    }
    return true;
  }, [activeStep, complete, CampaignSteps]);

  return (
    <React.Fragment>
      {isLoading && <CircularLoader />}
      <TopBar links={topBarProps.links} />
      <PageTransitions>
        <Name />
        <CampaignContainer>
          <CampaignStepper
            activeStep={activeStep}
            step={CampaignSteps.CONTENT}
            title="Content"
            placeholder="Design the content for your email."
            value={template || "No content is selected for this campaign"}
            style={{ overflow: "auto" }}
          >
            <Content nextStep={handleNext} />
          </CampaignStepper>

          <CampaignStepper
            activeStep={activeStep}
            step={CampaignSteps.TO}
            title="To"
            placeholder="Who are you sending this campaign to?"
            value={campaignToValue}
          >
            {audienceLoading || audienceFetching ? (
              <SimpleLoader />
            ) : (
              <To
                recipientTags={recipientTags}
                count={audienceCount}
                nextStep={handleNext}
                prevStep={handleBack}
                tags={tags}
              />
            )}
          </CampaignStepper>

          <CampaignStepper
            activeStep={activeStep}
            step={CampaignSteps.FROM}
            title="From"
            placeholder="Who is sending this campaign?"
            value={campaignFromValue}
          >
            {identitiesLoading ? (
              <SimpleLoader />
            ) : (
              <From
                emailsList={identities}
                senderEmail={senderEmail}
                nextStep={handleNext}
                prevStep={handleBack}
              />
            )}
          </CampaignStepper>
          <CampaignStepper
            activeStep={activeStep}
            step={CampaignSteps.SUBJECT}
            title="Subject"
            placeholder="What's the subject line for this campaign?"
            value={campaignSubjectValue}
          >
            <Subject
              nextStep={handleNext.bind(undefined, changeComplete)}
              prevStep={handleBack}
            />
          </CampaignStepper>
        </CampaignContainer>

        <div className={classes.buttonContainer}>
          {isComplete && (
            <button className="" onClick={handleBack}>
              <BsArrowUpCircle
                fontSize={"2rem"}
                className="text-secondary  cursor-pointer transition-all hover:text-secondary/70"
              />
            </button>
          )}
          <CustomButton icon="add" disabled={!isComplete} onClick={onCreate}>
            Create Campaign
          </CustomButton>
          <CustomButton icon="cancel" onClick={goBack}>
            Cancel
          </CustomButton>
        </div>
      </PageTransitions>
    </React.Fragment>
  );
}

export default CreateCampaignPage;
