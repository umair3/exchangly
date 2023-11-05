import { IPaginationType } from "../CommonTypesAPI";

export interface IActivitiesAPI {
  id: number;
  created: string;
  updated: string;
  module: string;
  operation: string;
}

export interface IActivitiesAPIResponseAPI {
  data: IPaginationType<IActivitiesAPI>;
}
