import { request } from "../../../utils";

interface IUserTimelineMethodParams {
  page: number;
  searchEmail: string;
}

export class UserJourneyService {
  static getUserTimeline(params: IUserTimelineMethodParams) {
    return request({
      url: `/dispatcher/?receiver=${params.searchEmail}&page=${params.page}`,
    });
  }
}
