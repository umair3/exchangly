interface IPaths {
  billing: string;
  statusPending: string;
  dashboard: string;
  audience: string;
  importAudienceContacts: string;
  campaign: string;
  createCampaign: string;
  campaignExecutionLogs: string;
  integrations: string;
  templates: string;
  templateDetail: string;
  addTemplate: string;
  editTemplate: string;
  userJourney: string;
  domainIdentity: string;
  emailsIdentity: string;
  createEmailIdentity: string;
  plansAndBilling: string;
  teams: string;
  createTeamMember: string;
  socialIntegrations: string;
}

const withAppPrefix = (path: string) => {
  if (path.charAt(0) === "/") {
    return `/app${path}`;
  }
  return `/app/${path}`;
};

export const paths: IPaths = {
  billing: "/billing",
  statusPending: "/contact-support/pending-status",
  dashboard: withAppPrefix("/dashboard"),
  audience: withAppPrefix("/audience"),
  importAudienceContacts: withAppPrefix("/audience/import-contacts"),
  campaign: withAppPrefix("/campaign"),
  createCampaign: withAppPrefix("/campaign/create"),
  campaignExecutionLogs: withAppPrefix("/campaign/execution/logs/:executionId"),
  integrations: withAppPrefix("/settings/integrations"),
  templates: withAppPrefix("/templates"),
  templateDetail: withAppPrefix("/templates/:id/details"),
  addTemplate: withAppPrefix("/templates/create-template"),
  editTemplate: withAppPrefix("/templates/edit-template/:id"),
  userJourney: withAppPrefix("/user-journey"),
  domainIdentity: withAppPrefix("/settings/verify-domain"),
  emailsIdentity: withAppPrefix("/settings/verified-email-identities"),
  createEmailIdentity: withAppPrefix("/settings/create-email-identity"),
  plansAndBilling: withAppPrefix("/settings/plans-billing"),
  teams: withAppPrefix("/settings/teams"),
  createTeamMember: withAppPrefix("/settings/teams/create-team"),
  socialIntegrations: withAppPrefix("/settings/connect/social"),
};
