import { request } from "../../../utils";

interface ICampaignExecutionListParams {
  page: number;
  campaignId: number;
  status: string;
}

interface ICreateCampaignParams {
  title: string;
  recipientIds: number[];
  senderEmail: string;
  subject: string;
  previewText: string;
  template: string;
}

export class CampaignService {
  static createCampaign(params: ICreateCampaignParams) {
    const { title, recipientIds, previewText, senderEmail, subject, template } =
      params;
    return request({
      url: "/campaigns/",
      method: "POST",
      data: {
        title,
        from_email: senderEmail,
        email_subject: subject,
        email_preview_text: previewText,
        email_body: template,

        to_tags: recipientIds,
      },
    });
  }

  static getCampaignsList(page: number) {
    return request({
      url: `/campaigns/?page=${page}`,
    });
  }

  static getCampaignExecutions(params: ICampaignExecutionListParams) {
    const { page, campaignId, status } = params;

    const paramsObj: any = { page: String(page) };

    if (campaignId) {
      paramsObj["campaignId"] = campaignId;
    }
    if (status) {
      paramsObj["status"] = status;
    }

    const searchParams = new URLSearchParams(paramsObj);

    return request({
      url: `/campaign_executions/?${searchParams.toString()}`,
    });
  }

  static getExecutionLogByStatus(campaignExecutionId: number, status: string) {
    return request({
      url: `/campaign_execution_logs/?campaignExecutionId=${campaignExecutionId}&status=${status}`,
    });
  }

  static deleteCampaign(campaignId: number) {
    return request({
      url: `/campaigns/${campaignId}/`,
      method: "DELETE",
    });
  }

  static executeCampaign(campaignId: number) {
    return request({
      url: "/campaign_executions/",
      method: "POST",
      data: {
        campaign: campaignId,
        status: "",
      },
    });
  }
}
