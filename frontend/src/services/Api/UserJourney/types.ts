import { IPaginationType } from "../CommonTypesAPI";

export interface IUserTimelineAPI {
  id: number;
  created: string;
  updated: string;
  sender: string;
  receiver: string;
  subject: string;
  body: string;
  paramsJSON: string | object;
}

export interface IUserTimelineAPIResponse {
  data: IPaginationType<IUserTimelineAPI>;
}
