import { IPaginationType } from "../CommonTypesAPI";

export interface IEmailTemplateAPI {
  id: number;
  subject: string;
  body: string;
  description: null | string;
  thumbnail: null | string;
  status: string;
  order: number;
  user_defined: boolean;
  created: string;
  updated: string;
}

export interface IEmailTemplatesAPIResponse {
  data: IPaginationType<IEmailTemplateAPI>;
}

export interface IUserTemplateAPI {
  id: number;
  created: string;
  updated: string;
  subject: string;
  body: string;
  description: null | string;
  user_defined: boolean;
}

export interface IUserTemplatesAPIResponse {
  data: IPaginationType<IUserTemplateAPI>;
}
