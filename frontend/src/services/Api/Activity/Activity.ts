import { request } from "../../../utils";

interface IGetActivitiesParams {
  page: string;
  module: string;
}
export class ActivityService {
  static getActivities(params: IGetActivitiesParams) {
    const { page, module } = params;

    const paramsObj: Partial<IGetActivitiesParams> = { page };

    if (module) {
      paramsObj["module"] = module;
    }

    const searchParams = new URLSearchParams(paramsObj).toString();

    return request({
      url: `/activities/?${searchParams}`,
    });
  }
}
