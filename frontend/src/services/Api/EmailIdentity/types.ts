import { IPaginationType } from "../CommonTypesAPI";

export interface IEmailIdentityAPI {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  status: boolean;
  default: boolean;
  created: string;
  updated: string;
}

export interface IEmailIdentitiesAPIResponse {
  data: IPaginationType<IEmailIdentityAPI>;
}
