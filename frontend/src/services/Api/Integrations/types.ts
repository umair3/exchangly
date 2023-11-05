import { IPaginationType } from "../CommonTypesAPI";

export interface ISingleIntegrationAPI {
  id: number;
  title: string;
  type: string;
  host: string;
  port: number;
  key: string;
  passphrase: string;
  default: boolean;
  created: string;
  updated: string;
}

export interface IIntegrationsListResponseAPI {
  data: IPaginationType<ISingleIntegrationAPI>;
}

export interface IIntegrationRequiredFieldsAPI {
  title: string;
  type: string;
  host: string;
  port: number;
  key: string;
  passphrase: string;
  default: boolean;
}

export interface IAddIntegrationResponseAPI {
  data: ISingleIntegrationAPI;
}

export interface IEditIntegrationResponseAPI {
  data: ISingleIntegrationAPI;
}
