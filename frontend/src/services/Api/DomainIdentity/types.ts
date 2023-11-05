import { IPaginationType } from "../CommonTypesAPI";

export interface IDomainIdentity {
  id: number;
  name: string;
  txt_record: string;
  spf_txt_record: string;
  dkim_subdomain: string;
  dkim_txt_record: string;
  created: string;
  updated: string;
  verified: boolean;
  spf_verified: boolean;
  dkim_verified: boolean;
}

export interface IDomainsListAPIResponse {
  data: IPaginationType<IDomainIdentity>;
}

export interface IDomainCreateAPIResponse {
  data: IDomainIdentity;
}

export interface IDomainUpdateAPIResponse {
  data: IDomainIdentity;
}
