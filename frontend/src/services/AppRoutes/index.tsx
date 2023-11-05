import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import ImportContactsPage from "../../pages/Audience/ImportContacts/Loadable";
import AudiencePage from "../../pages/Audience/Loadable";
import BillingPage from "../../pages/Billing/Loadable";
import CreateCampaignPage from "../../pages/Campaign/CreateCampaign/Loadable";

import ExecutionLogsPage from "../../pages/Campaign/ExecutionLogs/Loadable";
import CampaignPage from "../../pages/Campaign/Loadable";
import DashboardPage from "../../pages/Dashboard/Loadable";
import IntegrationsPage from "../../pages/Integrations/Loadable";
import UserJourneyPage from "../../pages/UserJourney/Loadable";

import NotFoundPage from "../../pages/NotFound/Loadable";
import DomainIdentityPage from "../../pages/Settings/DomainIdentity/Loadable";
import CreateEmailIdentityPage from "../../pages/Settings/EmailsIdentity/CreateEmailIdentity/Loadable";
import EmailsIdentityPage from "../../pages/Settings/EmailsIdentity/Loadable";
import PlansAndBillingPage from "../../pages/Settings/PlansAndBilling/Loadable";
import StatusPendingPage from "../../pages/StatusPending/Loadable";
import TemplatesPage from "../../pages/Templates/Loadable";
import TemplateDetails from "../../pages/Templates/TemplateDetail/Loadable";
import AddTemplatePage from "../../pages/Templates/AddTemplate/Loadable";
import EditTemplatePage from "../../pages/Templates/EditTemplate/Loadable";
import TeamsPage from "../../pages/Settings/Teams/Loadable";
import CreateTeamPage from "../../pages/Settings/Teams/CreateTeamMember/Loadable";
import SocialIntegrationsPage from "../../pages/Settings/SocialIntegrations/Loadable";

import AppLayout from "./AppLayout";
import { paths } from "./paths";
import RequireAuth from "./RequireAuth";
import RequireBilling from "./RequireBilling";
import RequireFirstSubscription from "./RequireFirstSubscription";
import RequireStatusPending from "./RequireStatusPending";

const AppRoutes: React.FC = () => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Navigate to={paths.dashboard} />} />

          <Route element={<RequireFirstSubscription />}>
            <Route path={paths.billing} element={<BillingPage />} />
          </Route>

          <Route element={<RequireStatusPending />}>
            <Route path={paths.statusPending} element={<StatusPendingPage />} />
          </Route>

          <Route element={<RequireBilling />}>
            <Route element={<AppLayout />}>
              <Route path={paths.dashboard} element={<DashboardPage />} />
              <Route path={paths.audience} element={<AudiencePage />} />
              <Route
                path={paths.importAudienceContacts}
                element={<ImportContactsPage />}
              />
              <Route path={paths.campaign} element={<CampaignPage />} />
              <Route
                path={paths.createCampaign}
                element={<CreateCampaignPage />}
              />

              <Route
                path={paths.campaignExecutionLogs}
                element={<ExecutionLogsPage />}
              />

              {/* <Route path={paths.integrations} element={<IntegrationsPage />} /> */}

              <Route path={paths.userJourney} element={<UserJourneyPage />} />
              <Route path={paths.templates} element={<TemplatesPage />} />
              <Route
                path={paths.templateDetail}
                element={<TemplateDetails />}
              />

              <Route path={paths.addTemplate} element={<AddTemplatePage />} />
              <Route path={paths.editTemplate} element={<EditTemplatePage />} />

              <Route
                path={paths.domainIdentity}
                element={<DomainIdentityPage />}
              />

              <Route
                path={paths.emailsIdentity}
                element={<EmailsIdentityPage />}
              />
              <Route
                path={paths.createEmailIdentity}
                element={<CreateEmailIdentityPage />}
              />

              <Route
                path={paths.plansAndBilling}
                element={<PlansAndBillingPage />}
              />

              <Route path={paths.teams} element={<TeamsPage />} />
              <Route
                path={paths.createTeamMember}
                element={<CreateTeamPage />}
              />

              <Route
                path={paths.socialIntegrations}
                element={<SocialIntegrationsPage />}
              />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
