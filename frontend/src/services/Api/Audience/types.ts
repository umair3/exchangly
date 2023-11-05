import { IPaginationType } from "../CommonTypesAPI";

export interface IAudienceListAPI {
  id: number;
  email: string;
  created: string;
  updated: string;
  status: string;
  tags: number[];
}

export interface IAudienceListResponseAPI {
  data: IPaginationType<IAudienceListAPI>;
}

export interface ITagAPI {
  id: number;
  created: string;
  update: string;
  title: string;
}

export interface IFetchTagsResponseAPI {
  data: ITagAPI[];
}
export interface ISearchTagsResponseAPI {
  data: ITagAPI[];
}

export interface IAudienceBulkImportAPI {
  message: string;
}

export interface IAudienceBulkImportResponseAPI {
  data: IAudienceBulkImportAPI;
}

interface ITagWiseCount {
  [key: string]: number;
}
export interface IAudienceStatsAPI {
  total_audience: number;
  tag_wise_count: ITagWiseCount;
}

export interface IAudienceStatsResponseAPI {
  data: IAudienceStatsAPI;
}
