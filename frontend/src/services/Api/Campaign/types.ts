import { IPaginationType } from "../CommonTypesAPI";

export interface ICampaignListAPI {
  id: number;
  created: string;
  updated: string;
  title: string;
}

export interface ICampaignListResponseAPI {
  data: IPaginationType<ICampaignListAPI>;
}

export interface ICampaignExecutionsListAPI {
  id: number;
  created: string;
  update: string;
  status: string;
  campaign: ICampaignListAPI;
}

export interface ICampaignExecutionsListResponseAPI {
  data: IPaginationType<ICampaignExecutionsListAPI>;
}

export interface IExecutionLogByStatusAPI {
  id: number;
  created: string;
  updated: string;
  email: string;
  status: string;
  campaign_execution: number;
}
export interface IExecutionLogByStatusResponseAPI {
  data: IPaginationType<IExecutionLogByStatusAPI>;
}
